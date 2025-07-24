/**
 * Performance monitoring utilities for image loading and component optimization
 */

/**
 * Track image loading performance
 * @param {string} imageSrc - Image source URL
 * @param {number} startTime - Performance start time
 */
export function trackImageLoadTime(imageSrc, startTime) {
  if (typeof window === 'undefined') return;

  const loadTime = performance.now() - startTime;

  // Log performance metrics (in production, you might send this to analytics)
  if (process.env.NODE_ENV === 'development') {
    console.log(`Image loaded: ${imageSrc} in ${loadTime.toFixed(2)}ms`);
  }

  // Track Core Web Vitals related metrics
  if (loadTime > 2500) {
    console.warn(`Slow image loading detected: ${imageSrc} took ${loadTime.toFixed(2)}ms`);
  }
}

/**
 * Measure component render time
 * @param {string} componentName - Name of the component
 * @param {Function} renderFunction - Function to measure
 */
export function measureComponentRender(componentName, renderFunction) {
  if (typeof window === 'undefined') return renderFunction();

  const startTime = performance.now();
  const result = renderFunction();
  const renderTime = performance.now() - startTime;

  if (process.env.NODE_ENV === 'development') {
    console.log(`${componentName} rendered in ${renderTime.toFixed(2)}ms`);
  }

  return result;
}

/**
 * Intersection Observer for lazy loading optimization
 * @param {Function} callback - Callback when element enters viewport
 * @param {Object} options - Intersection observer options
 */
export function createIntersectionObserver(callback, options = {}) {
  if (typeof window === 'undefined') return null;

  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Preload critical resources
 * @param {Array} resources - Array of resource objects with type and href
 */
export function preloadCriticalResources(resources) {
  if (typeof window === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.type;
    link.href = resource.href;

    if (resource.type === 'image') {
      link.crossOrigin = 'anonymous';
    }

    document.head.appendChild(link);
  });
}

/**
 * Monitor Largest Contentful Paint (LCP)
 */
export function monitorLCP() {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      if (process.env.NODE_ENV === 'development') {
        console.log('LCP:', lastEntry.startTime.toFixed(2) + 'ms');
      }

      // Disconnect after first meaningful paint
      observer.disconnect();
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (error) {
    console.warn('LCP monitoring not supported:', error);
  }
}

/**
 * Monitor First Input Delay (FID)
 */
export function monitorFID() {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (process.env.NODE_ENV === 'development') {
          console.log('FID:', entry.processingStart - entry.startTime + 'ms');
        }
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
  } catch (error) {
    console.warn('FID monitoring not supported:', error);
  }
}

/**
 * Monitor Cumulative Layout Shift (CLS)
 */
export function monitorCLS() {
  if (typeof window === 'undefined') return;

  try {
    let clsValue = 0;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;

          if (process.env.NODE_ENV === 'development') {
            console.log('CLS:', clsValue.toFixed(4));
          }
        }
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    console.warn('CLS monitoring not supported:', error);
  }
}

/**
 * Initialize all performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Only monitor in development or when explicitly enabled
  if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_MONITOR_PERFORMANCE === 'true') {
    monitorLCP();
    monitorFID();
    monitorCLS();
  }
}