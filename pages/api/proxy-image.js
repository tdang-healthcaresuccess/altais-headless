// API route to proxy WordPress files (images, documents, PDFs, etc.)
// This is now an alias to proxy-file.js for backward compatibility
export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  // Validate that the URL is from your WordPress backend
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL;
  const wordpressDomain = new URL(wordpressUrl).hostname;
  
  try {
    const fileUrl = new URL(decodeURIComponent(url));
    
    // Only allow files from your WordPress domain
    if (fileUrl.hostname !== wordpressDomain) {
      return res.status(403).json({ error: 'Unauthorized domain' });
    }
    
    // Fetch the file from WordPress
    const response = await fetch(fileUrl.toString());
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch file' });
    }
    
    // Get the content type and other headers
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length');
    const contentDisposition = response.headers.get('content-disposition');
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    
    // Set cache headers based on file type
    if (contentType.startsWith('image/')) {
      // Images - long cache
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (contentType === 'application/pdf' || contentType.includes('document')) {
      // Documents - medium cache
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    } else {
      // Other files - short cache
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
    }
    
    // Preserve content length if available
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    
    // Preserve content disposition for downloads
    if (contentDisposition) {
      res.setHeader('Content-Disposition', contentDisposition);
    }
    
    // Stream the file
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
    
  } catch (error) {
    console.error('File proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}