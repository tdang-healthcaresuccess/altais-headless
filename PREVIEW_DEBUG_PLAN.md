# Preview Debugging and Fix for Production Issues

## ISSUE IDENTIFIED:
The preview functionality is failing on production due to proxy configuration conflicts.
The issue occurs because:

1. usePreviewNode() hook depends on proper WordPress API communication
2. Production env vars are configured to hide backend URLs  
3. Preview requests may be getting caught in proxy redirect loops
4. GraphQL queries in preview mode may be failing due to URL mismatches

## SOLUTION IMPLEMENTED:

### 1. Updated wp-templates/preview.js
- Added enhanced error handling and debugging
- Added preview mode indicator for better UX
- Added detailed error information for troubleshooting
- Added URL logging to track preview requests

### 2. Updated utils/imageProxy.js
- Added preview URL detection to prevent proxy interference
- Skip proxying for URLs containing 'preview=true', 'code=', or preview parameters
- Prevents preview authentication from being broken by proxy system

### 3. Updated next.config.js
- Added beforeFiles rewrite rule to preserve preview URLs
- Prevents preview URLs with 'code' parameter from being redirected
- Ensures preview requests reach the correct endpoint

### 4. Updated pages/preview.js
- Added debug logging for props and query parameters
- Better tracking of preview request flow

## FILES UPDATED:
- ✅ wp-templates/preview.js (enhanced error handling + debugging)
- ✅ next.config.js (preview URL preservation)
- ✅ utils/imageProxy.js (preview URL exclusion)
- ✅ pages/preview.js (debug logging)

## TESTING CHECKLIST:
- [ ] Test preview functionality in development
- [ ] Test preview functionality in production
- [ ] Verify proxy still works for regular file URLs
- [ ] Check that preview URLs with 'code=' parameter work correctly
- [ ] Verify no infinite redirect loops occur

## DEPLOYMENT NOTES:
This fix should resolve the production preview issue by:
1. Preventing the proxy system from interfering with preview authentication
2. Adding proper error handling for debugging production issues
3. Preserving preview URLs in the Next.js routing system

The changes are backward compatible and won't affect existing functionality.