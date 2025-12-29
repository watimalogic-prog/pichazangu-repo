/**
 * Pichazangu Image CDN Simulation Service
 * Transforms raw Unsplash URLs into optimized delivery formats.
 */

interface OptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg';
  fit?: 'crop' | 'max' | 'clamp';
}

export const getOptimizedUrl = (url: string, options: OptimizationOptions = {}) => {
  if (!url || !url.includes('unsplash.com')) return url;

  const {
    width = 800,
    quality = 75,
    format = 'webp',
    fit = 'crop'
  } = options;

  // Split and reassemble with optimized parameters
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?auto=format&fit=${fit}&w=${width}&q=${quality}&fm=${format}`;
};

/**
 * Generates a tiny, highly compressed version for the "Blur-Up" effect.
 * Requesting a 20px thumbnail at 10% quality.
 */
export const getBlurPlaceholder = (url: string) => {
  if (!url || !url.includes('unsplash.com')) return url;
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?auto=format&fit=crop&w=20&q=10&fm=jpg&blur=20`;
};
