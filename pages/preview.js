import { WordPressTemplate } from "@faustwp/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Preview(props) {
  const router = useRouter();
  
  console.log("[Preview Page] Props:", props);
  console.log("[Preview Page] Router Query:", router.query);
  console.log("[Preview Page] Router asPath:", router.asPath);
  console.log("[Preview Page] Current URL:", typeof window !== 'undefined' ? window.location.href : 'SSR');
  console.log("[Preview Page] Environment:", typeof window !== 'undefined' ? window.location.hostname : 'SSR');
  
  // Production-specific query parameter handling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const isProduction = window.location.hostname !== 'localhost' && 
                          !window.location.hostname.includes('127.0.0.1') &&
                          !window.location.hostname.includes('.local');
      
      const hasPreviewParams = url.searchParams.has('code') || 
                              url.searchParams.has('preview') || 
                              url.searchParams.has('page_id') || 
                              url.searchParams.has('p');
      
      // Only apply on production if query parameters are missing from router
      if (isProduction && hasPreviewParams && Object.keys(router.query).length === 0) {
        console.log("[Preview Page] Production: Query params missing, forcing router update");
        const queryParams = Object.fromEntries(url.searchParams);
        
        // Force update the router query on production only
        router.replace({
          pathname: router.pathname,
          query: queryParams
        }, router.asPath, { shallow: true });
      }
    }
  }, [router]);
  
  // Environment-aware props enhancement
  const enhancedProps = (() => {
    if (typeof window === 'undefined') {
      // Server-side: just return props as-is
      return props;
    }
    
    const isProduction = window.location.hostname !== 'localhost' && 
                        !window.location.hostname.includes('127.0.0.1') &&
                        !window.location.hostname.includes('.local');
    
    // On production, enhance with URL search params if router query is empty
    if (isProduction && Object.keys(router.query).length === 0) {
      const url = new URL(window.location.href);
      const queryFromUrl = Object.fromEntries(url.searchParams);
      
      return {
        ...props,
        router: {
          ...router,
          query: queryFromUrl
        }
      };
    }
    
    // On localhost or when router.query has content, use as-is
    return {
      ...props,
      router: {
        ...router,
        query: router.query
      }
    };
  })();
  
  return <WordPressTemplate {...enhancedProps} />;
}
