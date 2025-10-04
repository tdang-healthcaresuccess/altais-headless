// Utility functions to proxy WordPress files (images, documents, PDFs, etc.)

/**
 * Creates a clean display URL from the WordPress URL for showing to users
 * @param {string} originalUrl - The original WordPress file URL
 * @returns {string} - A clean display URL
 */
export function getCleanDisplayUrl(originalUrl) {
  if (!originalUrl) return '';
  
  // Extract the file path from wp-content/uploads
  const match = originalUrl.match(/\/wp-content\/uploads\/(.+)$/);
  if (!match) {
    return '/files/document';
  }
  
  const filePath = match[1];
  return `/api/proxy-file/${filePath}`;
}

/**
 * Converts WordPress file URLs to clean proxied URLs without exposing backend
 * @param {string} originalUrl - The original WordPress file URL
 * @param {string} endpoint - The API endpoint to use ('proxy-image' or 'proxy-file')
 * @returns {string|null} - The clean proxied URL or original URL if not from WordPress
 */
export function proxyFileUrl(originalUrl, endpoint = 'proxy-file') {
  if (!originalUrl) return null;
  
  // Skip if it's already a proxied URL to avoid double-proxying
  if (originalUrl.startsWith('/api/proxy-') || originalUrl.startsWith('/_next/image/')) {
    return originalUrl;
  }
  
  // Skip if it's already a local URL or not from WordPress
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!wordpressUrl || !originalUrl.includes(new URL(wordpressUrl).hostname)) {
    return originalUrl;
  }
  
  // Extract the file path from wp-content/uploads
  const match = originalUrl.match(/\/wp-content\/uploads\/(.+)$/);
  if (!match) {
    // Fallback to old method if we can't parse the path
    return `/api/${endpoint}?url=${encodeURIComponent(originalUrl)}`;
  }
  
  const filePath = match[1];
  
  // Return clean URL without exposing backend
  return `/api/${endpoint}/${filePath}`;
}

/**
 * Legacy function for backward compatibility - specifically for images
 * @param {string} originalUrl - The original WordPress image URL
 * @returns {string|null} - The proxied URL or original URL if not from WordPress
 */
export function proxyImageUrl(originalUrl) {
  return proxyFileUrl(originalUrl, 'proxy-file');
}

/**
 * Hook to automatically proxy WordPress image URLs
 * @param {string} originalUrl - The original WordPress image URL
 * @returns {string|null} - The proxied URL
 */
export function useProxiedImageUrl(originalUrl) {
  return proxyImageUrl(originalUrl);
}

/**
 * Hook to automatically proxy WordPress file URLs (all types)
 * @param {string} originalUrl - The original WordPress file URL
 * @returns {string|null} - The proxied URL
 */
export function useProxiedFileUrl(originalUrl) {
  return proxyFileUrl(originalUrl);
}

/**
 * Helper to determine file type from URL
 * @param {string} url - The file URL
 * @returns {string} - The file type category
 */
export function getFileType(url) {
  if (!url) return 'unknown';
  
  const extension = url.split('.').pop()?.toLowerCase();
  
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'];
  const documentTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'];
  const audioTypes = ['mp3', 'wav', 'ogg', 'aac', 'm4a'];
  const videoTypes = ['mp4', 'webm', 'ogg', 'avi', 'mov', 'wmv'];
  
  if (imageTypes.includes(extension)) return 'image';
  if (documentTypes.includes(extension)) return 'document';
  if (audioTypes.includes(extension)) return 'audio';
  if (videoTypes.includes(extension)) return 'video';
  
  return 'other';
}