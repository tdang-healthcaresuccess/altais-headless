# ACF Components Update Guide

## Quick Migration Guide for ACF Components

### The Problem
Your ACF components use `dangerouslySetInnerHTML` which may contain hardcoded WordPress backend URLs that won't be automatically proxied.

### The Solution
Replace `dangerouslySetInnerHTML` with `WordPressContent` component or use the safe processor.

## Method 1: WordPressContent Component (Recommended)

### Before:
```javascript
<div 
  dangerouslySetInnerHTML={{ __html: content }}
  className="my-class"
/>
```

### After:
```javascript
import WordPressContent from "../WordPressContent";

<WordPressContent 
  content={content}
  className="my-class"
/>
```

## Method 2: SafeWordPressHTML (For complex cases)

### Before:
```javascript
<div 
  dangerouslySetInnerHTML={{ __html: content }}
  className="my-class"
/>
```

### After:
```javascript
import { SafeWordPressHTML } from "../WordPressContent";

<div 
  dangerouslySetInnerHTML={SafeWordPressHTML({ content })}
  className="my-class"
/>
```

## Method 3: Update Images (Also recommended)

### Before:
```javascript
<img src={imageUrl} alt={alt} />
```

### After:
```javascript
import WordPressImage from "../WordPressImage";

<WordPressImage src={imageUrl} alt={alt} width={400} height={300} />
```

## Files to Update

Based on your components, here are the files that need updates:

### 1. Section1a.js
- Line 56: `dangerouslySetInnerHTML={{ __html: sectionContent }}`
- Line 38: `data.section1aImg?.node?.sourceUrl` (image)

### 2. Section2a.js  
- Line 51: `dangerouslySetInnerHTML={{ __html: content2a }}`

### 3. Section3a.js ✅ (Already updated)
- Images and content now use WordPress proxy components

### 4. Section4a.js
- Line 49: `dangerouslySetInnerHTML={{ __html: section4aDescription }}`
- Line 29: `section4aImage?.node?.sourceUrl` (image)

### 5. Section5a.js
- Line 21: `dangerouslySetInnerHTML={{ __html: section5aContent }}`

### 6. TemplateC.js
- Line 31: `dangerouslySetInnerHTML={{ __html: bodyContent }}`

## Automated Update Script

You can also use this find-and-replace pattern in your editor:

**Find:** `dangerouslySetInnerHTML={{\\s*__html:\\s*([^}]+)\\s*}}`
**Replace:** `Use WordPressContent component instead`

## Testing

After updating components:

1. Check pages that use these ACF components
2. Look for any WordPress backend URLs in the browser inspector
3. Verify that images and file links work correctly
4. Test download links and embedded media

## Benefits After Update

- ✅ All WordPress URLs hidden from frontend
- ✅ Automatic file proxying for images, documents, videos
- ✅ Better security and SEO
- ✅ No manual URL replacement needed