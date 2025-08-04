"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import {
  STATIC_BLUR_DATA_URL,
  createImageErrorHandler,
} from "@/lib/image-utils";
import { trackImageLoadTime } from "@/lib/performance-utils";

/**
 * Optimized Image component with enhanced error handling and performance features
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = null,
  fallbackComponent = null,
  priority = false,
  quality = 80,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  onLoad,
  onError,
  ...props
}) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadStartTime] = useState(() => performance.now());

  const handleLoad = useCallback(
    (event) => {
      setIsLoading(false);
      setImageError(false);

      // Track loading performance
      trackImageLoadTime(src, loadStartTime);

      onLoad?.(event);
    },
    [onLoad, src, loadStartTime]
  );

  const handleError = useCallback(
    (event) => {
      console.warn("Image failed to load:", event.target?.src || src);
      setIsLoading(false);
      setImageError(true);
      onError?.(event);
    },
    [onError, src]
  );

  // If there's an error and no fallback, show fallback component
  if (imageError && !fallbackSrc && fallbackComponent) {
    return fallbackComponent;
  }

  // If there's an error and no fallback options, show default fallback
  if (imageError && !fallbackSrc && !fallbackComponent) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 dark:bg-slate-700 ${className}`}
        style={{ width, height }}
      >
        <div className="text-slate-400 dark:text-slate-500 text-center">
          <svg
            className="w-8 h-8 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs">图片加载失败</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && (
        <div
          className={`absolute inset-0 bg-slate-100 dark:bg-slate-700 animate-pulse rounded`}
          style={{ width, height }}
        />
      )}
      <Image
        src={imageError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-200`}
        quality={quality}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        placeholder="blur"
        blurDataURL={STATIC_BLUR_DATA_URL}
        onLoad={handleLoad}
        onError={handleError}
        style={{ width, height }}
        {...props}
      />
    </div>
  );
}

/**
 * Optimized Avatar component for profile images
 */
export function OptimizedAvatar({
  src,
  alt,
  size = 128,
  className = "",
  fallbackInitials = "?",
  ...props
}) {
  const [imageError, setImageError] = useState(false);

  const fallbackComponent = (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <span style={{ fontSize: size * 0.4 }}>{fallbackInitials}</span>
    </div>
  );

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      fallbackComponent={fallbackComponent}
      priority={true}
      quality={90}
      sizes={`${size}px`}
      {...props}
    />
  );
}

/**
 * Optimized Project Image component
 */
export function OptimizedProjectImage({ src, alt, className = "", ...props }) {
  const fallbackComponent = (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 ${className}`}
    >
      <div className="text-slate-400 dark:text-slate-500 text-center">
        <svg
          className="w-12 h-12 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <p className="text-sm font-medium">项目预览</p>
      </div>
    </div>
  );

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      fallbackComponent={fallbackComponent}
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
}
