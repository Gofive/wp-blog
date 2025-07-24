/**
 * Image utility functions for optimization and fallback handling
 */

/**
 * Generate a placeholder image data URL
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display on placeholder
 * @param {string} bgColor - Background color (hex)
 * @param {string} textColor - Text color (hex)
 * @returns {string} Data URL for placeholder image
 */
export function generatePlaceholder(
  width = 400,
  height = 300,
  text = "Project Preview",
  bgColor = "#f1f5f9",
  textColor = "#64748b"
) {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="16" 
            fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generate optimized blur data URL for Next.js Image placeholder
 * @param {number} width - Blur image width (small)
 * @param {number} height - Blur image height (small)
 * @returns {string} Base64 encoded blur placeholder
 */
export function generateBlurDataURL(width = 8, height = 6) {
  // Create a minimal blur placeholder
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f1f5f9');
  gradient.addColorStop(1, '#e2e8f0');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.1);
}

/**
 * Static blur data URL for server-side rendering
 */
export const STATIC_BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

/**
 * Get optimized image props for Next.js Image component
 * @param {Object} options - Image options
 * @returns {Object} Optimized props for Image component
 */
export function getOptimizedImageProps({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 80,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}) {
  return {
    src,
    alt,
    width,
    height,
    quality,
    sizes,
    loading: priority ? "eager" : "lazy",
    priority,
    placeholder: "blur",
    blurDataURL: STATIC_BLUR_DATA_URL,
  };
}

/**
 * Image loading error handler
 * @param {Function} setError - State setter for error state
 * @param {string} fallbackSrc - Optional fallback image source
 * @returns {Function} Error handler function
 */
export function createImageErrorHandler(setError, fallbackSrc = null) {
  return (event) => {
    console.warn('Image failed to load:', event.target.src);
    setError(true);

    if (fallbackSrc && event.target.src !== fallbackSrc) {
      event.target.src = fallbackSrc;
      setError(false);
    }
  };
}

/**
 * Preload critical images
 * @param {Array<string>} imageSrcs - Array of image sources to preload
 */
export function preloadImages(imageSrcs) {
  if (typeof window === 'undefined') return;

  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}