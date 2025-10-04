// Dynamic file proxy that handles clean URLs like /api/proxy-file/2025/08/filename.jpg
export default async function handler(req, res) {
  try {
    const { path } = req.query;
    
    if (!path || !Array.isArray(path)) {
      return res.status(400).json({ error: 'Invalid file path' });
    }
    
    // Reconstruct the WordPress URL from the clean path
    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!wordpressUrl) {
      return res.status(500).json({ error: 'WordPress URL not configured' });
    }
    
    // Build the full WordPress file URL
    const filePath = path.join('/');
    const fullWordPressUrl = `${wordpressUrl}/wp-content/uploads/${filePath}`;
    
    console.log('Proxying file:', fullWordPressUrl);
    
    // Fetch the file from WordPress
    const response = await fetch(fullWordPressUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'File not found' });
    }
    
    // Get the file data
    const fileBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours
    res.setHeader('Content-Length', fileBuffer.byteLength);
    
    // If it's a downloadable file, set appropriate headers
    if (contentType.includes('pdf') || contentType.includes('document') || contentType.includes('zip')) {
      const filename = path[path.length - 1];
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    }
    
    // Send the file
    res.send(Buffer.from(fileBuffer));
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}