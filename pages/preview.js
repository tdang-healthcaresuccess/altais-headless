import { WordPressTemplate } from "@faustwp/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { getApolloClient } from "@faustwp/core";

export default function Preview(props) {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({});
  const [debugMode, setDebugMode] = useState(false);
  const [useCustomPreview, setUseCustomPreview] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
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
      
      // Enable simple mode if 'simple=1' is in URL
      if (url.searchParams.get('simple') === '1') {
        setSimpleMode(true);
      }
    }
  }, [router.query]);
  
  // Custom preview data fetcher (bypasses WordPressTemplate)
  const fetchPreviewData = async () => {
    if (!queryParams.page_id || !queryParams.code) return;
    
    setLoading(true);
    try {
      // Get the Apollo client from Faust.js
      const client = getApolloClient();
      
      // Direct GraphQL query to WordPress for preview data using the correct schema
      const GET_PREVIEW_PAGE = gql`
        query GetPreviewPage($id: ID!, $idType: PageIdType!, $asPreview: Boolean = true) {
          page(id: $id, idType: $idType, asPreview: $asPreview) {
            id
            title
            status
            slug
            date
            modified
            metaD {
              metaDescription
              titleTag
            }
            seo {
              title
              description
              canonicalUrl
            }
            contentTemplates {
              templateSelection
              templateA {
                ... on ContentTemplatesTemplateASection1aLayout {
                  fieldGroupName
                  section1aContent
                  section1aHeadline
                }
                ... on ContentTemplatesTemplateASection2aLayout {
                  fieldGroupName
                  section2aContent
                  section2aHeadline
                }
                ... on ContentTemplatesTemplateASection3aLayout {
                  fieldGroupName
                  section3aCards {
                    cardContent
                    cardHeadline
                  }
                }
              }
            }
          }
        }
      `;
      
      const result = await client.query({
        query: GET_PREVIEW_PAGE,
        variables: {
          id: queryParams.page_id,
          idType: 'DATABASE_ID',
          asPreview: true
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
  
  // SIMPLE MODE: Just show a basic page without any WordPress integration
  if (simpleMode) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>🔥 Simple Preview Mode</h1>
        <h2 style={{ color: 'green' }}>✅ SUCCESS: No redirects or infinite loops!</h2>
        
        <div style={{ background: '#f0f0f0', padding: '15px', marginBottom: '20px' }}>
          <h3>Extracted Parameters:</h3>
          <ul>
            <li><strong>Page ID:</strong> {queryParams.page_id || 'Not found'}</li>
            <li><strong>Preview Code:</strong> {queryParams.code ? 'Present' : 'Missing'}</li>
            <li><strong>Preview:</strong> {queryParams.preview || 'Not set'}</li>
            <li><strong>Type:</strong> {queryParams.typeName || 'Unknown'}</li>
          </ul>
        </div>
        
        <div style={{ background: '#e8f5e8', padding: '15px', marginBottom: '20px' }}>
          <h3>Testing Results:</h3>
          <p>• This mode completely bypasses WordPressTemplate</p>
          <p>• No GraphQL queries or WordPress authentication</p>
          <p>• Should have ZERO redirect issues</p>
          <p>• If this works, the problem is definitely in WordPressTemplate or Faust.js</p>
        </div>
        
        <h3>Test Options:</h3>
        <p>• Remove <code>&simple=1</code> to return to WordPressTemplate (may cause loops)</p>
        <p>• Add <code>&debug=1</code> to see raw debug data</p>
        <p>• Add <code>&custom=1</code> to test custom GraphQL handler</p>
        
        <hr style={{ margin: '30px 0' }} />
        <p><em>If you can see this page without any redirects, we've isolated the problem to WordPressTemplate.</em></p>
      </div>
    );
  }
  
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
        <p>• Add <code>&simple=1</code> to test simplest possible page (no WordPress at all)</p>
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
          
          {/* Display content templates */}
          {previewData.contentTemplates?.templateA && (
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px' }}>
              <h3>Content Templates:</h3>
              {previewData.contentTemplates.templateA.map((template, index) => (
                <div key={index} style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5' }}>
                  <p><strong>Type:</strong> {template.fieldGroupName}</p>
                  {template.section1aHeadline && <h4>{template.section1aHeadline}</h4>}
                  {template.section1aContent && <div dangerouslySetInnerHTML={{ __html: template.section1aContent }} />}
                  {template.section2aHeadline && <h4>{template.section2aHeadline}</h4>}
                  {template.section2aContent && <div dangerouslySetInnerHTML={{ __html: template.section2aContent }} />}
                  {template.section3aCards && template.section3aCards.map((card, cardIndex) => (
                    <div key={cardIndex} style={{ margin: '5px 0' }}>
                      <h5>{card.cardHeadline}</h5>
                      <div dangerouslySetInnerHTML={{ __html: card.cardContent }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          
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
