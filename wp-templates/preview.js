import React, { useEffect } from "react";
import { usePreviewNode } from "@faustwp/core";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function Preview() {
  const router = useRouter();
  const { node, loading, error } = usePreviewNode();
  
  // Prevent any automatic redirects during preview
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("[Preview] URL:", window.location.href);
      console.log("[Preview] Query params:", router.query);
      
      // Check for infinite redirect loops
      const url = new URL(window.location.href);
      const previewParam = url.searchParams.get('preview');
      const codeParam = url.searchParams.get('code');
      
      if (previewParam === 'true' && codeParam) {
        console.log("[Preview] Valid preview URL detected, preventing redirects");
        // Stop any potential redirect loops
        window.history.replaceState(null, '', window.location.href);
      }
    }
  }, [router.query]);
  
  console.log("[Preview] loading:", loading);
  console.log("[Preview] error:", error);
  console.log("[Preview] node:", node);

  try {
    if (loading) {
      return <div>Loading preview...</div>;
    }
    
    if (error || !node) {
      console.error("[Preview] Failed to load preview:", error);
      
      // Add debug information for production troubleshooting
      const debugInfo = {
        error: error?.message || 'Unknown error',
        url: typeof window !== 'undefined' ? window.location.href : 'SSR',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
        timestamp: new Date().toISOString()
      };
      
      return (
        <Layout>
          <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Preview Error</h1>
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <p className="mb-2"><strong>Error:</strong> {error?.message || 'Preview not found'}</p>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600">Debug Information</summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            </div>
            <p className="text-gray-600">
              If you're seeing this error, the preview may not be properly configured or the content may not exist.
            </p>
          </div>
        </Layout>
      );
    }

    // Render the preview node using your existing page/single logic
    // You may want to switch on node.__typename for custom rendering
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
            <p className="text-blue-800 font-medium">📝 Preview Mode</p>
            <p className="text-blue-600 text-sm">You are viewing a preview of unpublished content.</p>
          </div>
          <h1 className="text-2xl font-bold mb-4">{node.title || "Preview"}</h1>
          <div dangerouslySetInnerHTML={{ __html: node.content || "" }} />
        </div>
      </Layout>
    );
  } catch (e) {
    console.error("[Preview] Exception:", e);
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Preview Crashed</h1>
            <p className="text-red-700 mb-2">{e.message}</p>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600">Technical Details</summary>
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                {e.stack}
              </pre>
            </details>
          </div>
        </div>
      </Layout>
    );
  }
}
