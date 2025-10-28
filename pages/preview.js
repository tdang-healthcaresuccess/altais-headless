import { WordPressTemplate, getClient } from "@faustwp/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Preview(props) {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({});
  const [debugMode, setDebugMode] = useState(false);
  const [useCustomPreview, setUseCustomPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  console.log("[Preview Page] Props:", props);
  console.log("[Preview Page] Router Query:", router.query);
  console.log("[Preview Page] Router asPath:", router.asPath);
  console.log("[Preview Page] Current URL:", typeof window !== 'undefined' ? window.location.href : 'SSR');
  console.log("[Preview Page] Environment:", typeof window !== 'undefined' ? window.location.hostname : 'SSR');
  console.log("[Preview Page] Extracted Query Params:", queryParams);
  
  // Extract query parameters from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      
      // Always extract URL parameters for consistent behavior
      const urlParams = Object.fromEntries(url.searchParams);
      console.log("[Preview Page] URL Search Params:", urlParams);
      
      // Use URL params if router.query is empty (production issue) or merge them
      const finalParams = Object.keys(router.query).length > 0 ? router.query : urlParams;
      
      setQueryParams(finalParams);
      
      // Enable debug mode if 'debug=1' is in URL
      if (url.searchParams.get('debug') === '1') {
        setDebugMode(true);
      }
      
      // Enable custom preview if 'custom=1' is in URL
      if (url.searchParams.get('custom') === '1') {
        setUseCustomPreview(true);
      }
    }
  }, [router.query]);
  
  // Custom preview data fetcher (bypasses WordPressTemplate)
  const fetchPreviewData = async () => {
    if (!queryParams.page_id || !queryParams.code) return;
    
    setLoading(true);
    try {
      // Direct GraphQL query to WordPress for preview data
      const client = getClient();
      const query = `
        query GetPreviewPage($id: ID!, $idType: PageIdType!) {
          page(id: $id, idType: $idType) {
            id
            title
            content
            status
            slug
            date
            modified
          }
        }
      `;
      
      const result = await client.query({
        query: query,
        variables: {
          id: queryParams.page_id,
          idType: 'DATABASE_ID'
        },
        context: {
          headers: {
            'Authorization': `Bearer ${queryParams.code}` // Use preview code for auth
          }
        }
      });
      
      console.log("[Custom Preview] GraphQL result:", result);
      setPreviewData(result.data.page);
    } catch (error) {
      console.error("[Custom Preview] Error fetching data:", error);
      setPreviewData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch preview data when using custom mode
  useEffect(() => {
    if (useCustomPreview && queryParams.page_id && queryParams.code) {
      fetchPreviewData();
    }
  }, [useCustomPreview, queryParams]);
  
  // DEBUG MODE: Show raw data instead of WordPressTemplate
  if (debugMode) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>🔍 Preview Debug Mode</h1>
        <h2>Props:</h2>
        <pre>{JSON.stringify(props, null, 2)}</pre>
        
        <h2>Router Query:</h2>
        <pre>{JSON.stringify(router.query, null, 2)}</pre>
        
        <h2>Extracted Query Params:</h2>
        <pre>{JSON.stringify(queryParams, null, 2)}</pre>
        
        <h2>Current URL:</h2>
        <p>{typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
        
        <h2>Environment:</h2>
        <p>{typeof window !== 'undefined' ? window.location.hostname : 'SSR'}</p>
        
        <p><strong>This debug mode bypasses WordPressTemplate completely.</strong></p>
        <p>✅ <strong>SUCCESS: No infinite loop!</strong></p>
        <hr />
        <h3>Testing Options:</h3>
        <p>• Remove <code>&debug=1</code> to return to WordPressTemplate (will cause infinite loop)</p>
        <p>• Add <code>&custom=1</code> to test custom preview handler (no WordPressTemplate)</p>
      </div>
    );
  }
  
  // CUSTOM PREVIEW MODE: Bypass WordPressTemplate entirely
  if (useCustomPreview) {
    if (loading) {
      return <div style={{ padding: '20px' }}>Loading preview content...</div>;
    }
    
    if (previewData?.error) {
      return (
        <div style={{ padding: '20px' }}>
          <h1>Preview Error</h1>
          <p>Error: {previewData.error}</p>
          <p>This might be due to authentication issues with the preview code.</p>
        </div>
      );
    }
    
    if (previewData) {
      return (
        <div style={{ padding: '20px' }}>
          <h1>🎯 Custom Preview Mode</h1>
          <h2>Page Title: {previewData.title}</h2>
          <p><strong>Status:</strong> {previewData.status}</p>
          <p><strong>Last Modified:</strong> {previewData.modified}</p>
          <div 
            dangerouslySetInnerHTML={{ __html: previewData.content }} 
            style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px' }}
          />
          <hr />
          <p><strong>✅ This bypasses WordPressTemplate and should have no infinite loop!</strong></p>
          <p>Remove <code>&custom=1</code> to return to normal WordPressTemplate mode.</p>
        </div>
      );
    }
    
    return (
      <div style={{ padding: '20px' }}>
        <h1>Custom Preview</h1>
        <p>No preview data available. Check the page_id and code parameters.</p>
      </div>
    );
  }
  
  // NORMAL MODE: Use WordPressTemplate (will cause infinite loop)
  const enhancedProps = {
    ...props,
    router: {
      ...router,
      query: queryParams
    }
  };
  
  console.log("[Preview Page] Enhanced Props Query:", enhancedProps.router.query);
  
  return <WordPressTemplate {...enhancedProps} />;
}
