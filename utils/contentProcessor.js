// Utility to process WordPress HTML content and replace backend URLs with proxied URLs
import { proxyFileUrl } from './imageProxy';

/**
 * Processes HTML content and replaces WordPress backend URLs with proxied URLs
 * @param {string} htmlContent - The HTML content containing WordPress URLs
 * @returns {string} - The processed HTML with proxied URLs
 */
export function processWordPressContent(htmlContent) {
  if (!htmlContent) return htmlContent;
  
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!wordpressUrl) return htmlContent;
  
  const wordpressDomain = new URL(wordpressUrl).hostname;
  
  // Create a temporary div to parse the HTML
  if (typeof window !== 'undefined') {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Process all img tags
    const images = tempDiv.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && src.includes(wordpressDomain)) {
        // Extract the file path from wp-content/uploads
        const match = src.match(/\/wp-content\/uploads\/(.+)$/);
        if (match) {
          const filePath = match[1];
          img.setAttribute('src', `/api/proxy-file/${filePath}`);
        }
      }
    });
    
    // Process all links to files
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes(wordpressDomain)) {
        // Extract the file path from wp-content/uploads
        const match = href.match(/\/wp-content\/uploads\/(.+)$/);
        if (match) {
          const filePath = match[1];
          link.setAttribute('href', `/api/proxy-file/${filePath}`);
        }
      }
    });
    
    // Process all video sources
    const videos = tempDiv.querySelectorAll('video, source');
    videos.forEach(video => {
      const src = video.getAttribute('src');
      if (src && src.includes(wordpressDomain)) {
        const match = src.match(/\/wp-content\/uploads\/(.+)$/);
        if (match) {
          const filePath = match[1];
          video.setAttribute('src', `/api/proxy-file/${filePath}`);
        }
      }
    });
    
    // Process all audio sources
    const audios = tempDiv.querySelectorAll('audio, source');
    audios.forEach(audio => {
      const src = audio.getAttribute('src');
      if (src && src.includes(wordpressDomain)) {
        const match = src.match(/\/wp-content\/uploads\/(.+)$/);
        if (match) {
          const filePath = match[1];
          audio.setAttribute('src', `/api/proxy-file/${filePath}`);
        }
      }
    });
    
    return tempDiv.innerHTML;
  }
  
  // Server-side processing using regex (fallback)
  return processWordPressContentServerSide(htmlContent, wordpressDomain);
}

/**
 * Server-side HTML processing using regex
 * @param {string} htmlContent - The HTML content
 * @param {string} wordpressDomain - The WordPress domain to replace
 * @returns {string} - Processed HTML
 */
function processWordPressContentServerSide(htmlContent, wordpressDomain) {
  let processedContent = htmlContent;
  
  // Replace img src attributes with clean URLs
  processedContent = processedContent.replace(
    new RegExp(`<img([^>]*?)src=["']([^"']*${wordpressDomain}[^"']*\\/wp-content\\/uploads\\/([^"']*))["']([^>]*?)>`, 'gi'),
    (match, before, fullUrl, filePath, after) => {
      const cleanSrc = `/api/proxy-file/${filePath}`;
      return `<img${before}src="${cleanSrc}"${after}>`;
    }
  );
  
  // Replace link href attributes for files with clean URLs
  processedContent = processedContent.replace(
    new RegExp(`<a([^>]*?)href=["']([^"']*${wordpressDomain}[^"']*\\/wp-content\\/uploads\\/([^"']*\\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|mp4|mp3|wav|ogg|avi|mov|jpg|jpeg|png|gif|webp|svg)))["']([^>]*?)>`, 'gi'),
    (match, before, fullUrl, filePath, extension, after) => {
      const cleanHref = `/api/proxy-file/${filePath}`;
      return `<a${before}href="${cleanHref}"${after}>`;
    }
  );
  
  // Also catch wp-content/uploads links without specific extensions
  processedContent = processedContent.replace(
    new RegExp(`<a([^>]*?)href=["']([^"']*${wordpressDomain}[^"']*\\/wp-content\\/uploads\\/([^"']*))["']([^>]*?)>`, 'gi'),
    (match, before, fullUrl, filePath, after) => {
      const cleanHref = `/api/proxy-file/${filePath}`;
      return `<a${before}href="${cleanHref}"${after}>`;
    }
  );
  
  // Replace video src attributes
  processedContent = processedContent.replace(
    new RegExp(`<(video|source)([^>]*?)src=["']([^"']*${wordpressDomain}[^"']*)["']([^>]*?)>`, 'gi'),
    (match, tag, before, src, after) => {
      const proxiedSrc = proxyFileUrl(src, 'proxy-file');
      return `<${tag}${before}src="${proxiedSrc}"${after}>`;
    }
  );
  
  // Replace audio src attributes
  processedContent = processedContent.replace(
    new RegExp(`<(audio|source)([^>]*?)src=["']([^"']*${wordpressDomain}[^"']*)["']([^>]*?)>`, 'gi'),
    (match, tag, before, src, after) => {
      const proxiedSrc = proxyFileUrl(src, 'proxy-file');
      return `<${tag}${before}src="${proxiedSrc}"${after}>`;
    }
  );
  
  return processedContent;
}

/**
 * Determines if a URL points to a file (vs a webpage)
 * @param {string} url - The URL to check
 * @returns {boolean} - True if it's a file URL
 */
function isFileUrl(url) {
  const fileExtensions = [
    // Images
    'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff',
    // Documents
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf',
    // Audio
    'mp3', 'wav', 'ogg', 'aac', 'm4a',
    // Video
    'mp4', 'webm', 'avi', 'mov', 'wmv',
    // Archives
    'zip', 'rar', '7z', 'tar', 'gz'
  ];
  
  const extension = url.split('.').pop()?.toLowerCase();
  return fileExtensions.includes(extension);
}

/**
 * React hook to process WordPress HTML content
 * @param {string} htmlContent - The raw HTML content
 * @returns {string} - Processed HTML with proxied URLs
 */
export function useProcessedWordPressContent(htmlContent) {
  if (!htmlContent) return htmlContent;
  
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!wordpressUrl) return htmlContent;
  
  const wordpressDomain = new URL(wordpressUrl).hostname;
  
  // Always use server-side processing for consistency
  const processed = processWordPressContentServerSide(htmlContent, wordpressDomain);
  
  // Debug log to see if processing is working
  if (typeof window !== 'undefined' && htmlContent !== processed) {
    console.log('WordPress content processed:', { original: htmlContent, processed });
  }
  
  return processed;
}