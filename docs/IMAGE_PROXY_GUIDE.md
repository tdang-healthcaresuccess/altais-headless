# WordPress File Proxy Implementation Guide

This document outlines the implementation of file proxying to hide the WordPress backend URL from the frontend for **all file types** including images, documents, PDFs, videos, and audio files.

## Problem
In a headless WordPress setup with Faust.js, all media files are served directly from the WordPress backend URL (e.g., `bpaltaisheadle.wpenginepowered.com`), exposing your backend infrastructure.

## Solutions Implemented

### 1. Universal File Proxy API Route (`/pages/api/proxy-file.js`)
- Creates an API endpoint that fetches **any file type** from WordPress and serves them through your Next.js domain
- Handles images, documents (PDF, DOC, etc.), videos, audio files, and more
- Validates that requests only come from your WordPress domain for security
- Implements intelligent caching based on file type:
  - Images: Long cache (1 year)
  - Documents: Medium cache (1 day)
  - Other files: Short cache (1 hour)
- Preserves original headers (Content-Type, Content-Disposition, etc.)
- Usage: `/api/proxy-file?url=https://backend.wpengine.com/wp-content/uploads/document.pdf`

### 2. Enhanced File Proxy Utilities (`/utils/imageProxy.js`)
- `proxyFileUrl(originalUrl, endpoint)`: Converts any WordPress file URL to proxied URL
- `proxyImageUrl(originalUrl)`: Legacy function for images (backward compatibility)
- `useProxiedImageUrl(originalUrl)`: React hook for image URL conversion
- `useProxiedFileUrl(originalUrl)`: React hook for any file URL conversion
- `getFileType(url)`: Helper to determine file type from URL

### 3. Universal WordPress Media Components (`/components/WordPressImage.js`)

#### `WordPressImage` - Enhanced image component
- Drop-in replacement for Next.js `Image` component
- Automatically proxies WordPress images

#### `WordPressFileLink` - Document and file links
- Creates secure download links for PDFs, documents, etc.
- Automatically adds appropriate download attributes
- Usage: `<WordPressFileLink src={pdfUrl}>Download PDF</WordPressFileLink>`

#### `WordPressMedia` - Universal media component
- Automatically handles any media type based on file extension
- Images → `WordPressImage`
- Videos → `<video>` with proxied source
- Audio → `<audio>` with proxied source
- Documents → `WordPressFileLink`
- Usage: `<WordPressMedia src={anyFileUrl} />`

### 4. File Type Support

**Images:** JPG, JPEG, PNG, GIF, WebP, SVG, BMP, TIFF
**Documents:** PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, RTF
**Audio:** MP3, WAV, OGG, AAC, M4A
**Video:** MP4, WebM, OGG, AVI, MOV, WMV

## Implementation Examples

### Images
```javascript
// Before
<Image src={post.featuredImage.node.sourceUrl} alt="..." />

// After
<WordPressImage src={post.featuredImage.node.sourceUrl} alt="..." />
```

### Documents & PDFs
```javascript
// Before
<a href="https://backend.wpengine.com/wp-content/uploads/document.pdf">
  Download PDF
</a>

// After
<WordPressFileLink src={wordpressDocumentUrl}>
  Download PDF
</WordPressFileLink>
```

### Videos
```javascript
// Before
<video src="https://backend.wpengine.com/wp-content/uploads/video.mp4" controls />

// After
<WordPressMedia src={wordpressVideoUrl} controls />
```

### Universal Media Handler
```javascript
// Handles any file type automatically
<WordPressMedia src={anyWordPressFileUrl} />
```

### Custom Implementation
```javascript
import { useProxiedFileUrl } from '../utils/imageProxy';

function MyComponent({ fileUrl }) {
  const proxiedUrl = useProxiedFileUrl(fileUrl);
  
  return (
    <a href={proxiedUrl} target="_blank">
      Download File
    </a>
  );
}
```

## Common Use Cases

### 1. WordPress Media Library Files
Any file uploaded to WordPress media library will be automatically proxied:
- Featured images
- Gallery images
- Document downloads
- Video embeds
- Audio files

### 2. ACF (Advanced Custom Fields) Files
```javascript
// ACF file field
<WordPressFileLink src={acfFileField.url}>
  {acfFileField.title || 'Download'}
</WordPressFileLink>
```

### 3. Content with Mixed Media
```javascript
function ContentBlock({ mediaItems }) {
  return (
    <div>
      {mediaItems.map(item => (
        <WordPressMedia 
          key={item.id}
          src={item.url}
          alt={item.alt}
        />
      ))}
    </div>
  );
}
```

## Benefits
1. **Security**: WordPress backend URL is completely hidden
2. **Performance**: Files cached and optimized through your domain
3. **SEO**: All resources appear to come from your domain
4. **Universal**: Works with any file type WordPress supports
5. **Control**: Full control over file delivery and caching
6. **CDN Ready**: Easy to integrate with CDNs and optimization services

## Migration Steps

### Step 1: Update Image Components
Replace existing WordPress image usage:
```javascript
// Find and replace patterns like:
<Image src={wordpressImageUrl} />
// With:
<WordPressImage src={wordpressImageUrl} />
```

### Step 2: Update Document Links
Replace WordPress document links:
```javascript
// Find and replace patterns like:
<a href={wordpressPdfUrl}>Download</a>
// With:
<WordPressFileLink src={wordpressPdfUrl}>Download</WordPressFileLink>
```

### Step 3: Update Media Elements
Replace WordPress media elements:
```javascript
// Find and replace patterns like:
<video src={wordpressVideoUrl} />
// With:
<WordPressMedia src={wordpressVideoUrl} />
```

## Advanced Configuration

### Custom Caching Strategy
```javascript
// Customize caching in proxy-file.js
if (contentType.startsWith('image/')) {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
} else if (contentType === 'application/pdf') {
  res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
} else {
  res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
}
```

### Rate Limiting (Recommended)
```javascript
// Add to proxy-file.js for production
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## Performance Considerations
- **File Size**: Large files may impact server performance
- **Bandwidth**: All files flow through your Next.js server
- **Caching**: Implement aggressive caching for frequently accessed files
- **CDN**: Consider CDN integration for production
- **Rate Limiting**: Implement to prevent abuse

## Security Considerations
- Domain validation prevents unauthorized file access
- Only WordPress files can be proxied
- Consider implementing authentication for sensitive files
- Monitor for potential abuse of the proxy endpoint
- Use HTTPS for all file transfers

## Next Steps
1. **Test all file types** in development
2. **Update components** throughout your application
3. **Configure production environment** variables
4. **Set up monitoring** for file proxy usage
5. **Optional**: Integrate with CDN for enhanced performance

This solution provides complete WordPress backend URL hiding for all file types while maintaining security and performance!