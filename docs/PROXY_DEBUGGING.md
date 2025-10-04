# WordPress Proxy Debugging Guide

## Current Issues Identified:

### 1. **Images Breaking** 
- **Problem**: Double URL encoding in Next.js Image optimization
- **Symptoms**: URLs like `/_next/image/?url=%2Fapi%2Fproxy-image%3Furl%3D...`
- **Solution**: Added `unoptimized: true` for proxy URLs in WordPressImage component

### 2. **PDF Links Still Showing Backend URL**
- **Problem**: Content processor not catching all WordPress URLs
- **Symptoms**: Links still showing `bpaltaisheadle.wpenginepowered.com`
- **Solution**: Enhanced regex patterns to catch wp-content/uploads URLs

## Testing Steps:

### 1. Visit Test Page
Navigate to: `http://localhost:3006/test-proxy`

### 2. Check Browser Inspector
- **Images**: Should show `/api/proxy-file?url=...` (not double-encoded)
- **Links**: Should show `/api/proxy-file?url=...` (no backend domain visible)

### 3. Test Direct API
Try these URLs directly in browser:
- `http://localhost:3006/api/proxy-file?url=https%3A//bpaltaisheadle.wpenginepowered.com/wp-content/uploads/2025/08/test.jpg`

### 4. Check Console Logs
Look for debug messages showing content processing:
```javascript
// Should see in console:
WordPress content processed: { original: "...", processed: "..." }
```

## Quick Fixes Applied:

1. **Next.js Config**: Added localhost to domains, added unoptimized handling
2. **WordPressImage**: Added `unoptimized: true` for proxy URLs
3. **Content Processor**: Enhanced regex to catch more URL patterns
4. **Image Proxy**: Added double-proxy prevention

## Manual Testing Commands:

```bash
# Test image proxy directly
curl -I "http://localhost:3006/api/proxy-file?url=https%3A//bpaltaisheadle.wpenginepowered.com/wp-content/uploads/2025/08/test.jpg"

# Test PDF proxy directly  
curl -I "http://localhost:3006/api/proxy-file?url=https%3A//bpaltaisheadle.wpenginepowered.com/wp-content/uploads/2025/09/test.pdf"
```

## Expected Results:
- ✅ Images load without double encoding
- ✅ PDF links use proxy URLs 
- ✅ No backend WordPress URLs visible in frontend
- ✅ All file types (images, PDFs, docs) work through proxy