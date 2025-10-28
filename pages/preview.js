import { WordPressTemplate } from "@faustwp/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Preview(props) {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({});
  
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
      const isProduction = window.location.hostname !== 'localhost' && 
                          !window.location.hostname.includes('127.0.0.1') &&
                          !window.location.hostname.includes('.local');
      
      // Always extract URL parameters for consistent behavior
      const urlParams = Object.fromEntries(url.searchParams);
      console.log("[Preview Page] URL Search Params:", urlParams);
      
      // Use URL params if router.query is empty (production issue) or merge them
      const finalParams = Object.keys(router.query).length > 0 ? router.query : urlParams;
      
      setQueryParams(finalParams);
    }
  }, [router.query]);
  
  // Environment-aware props enhancement
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
