import { useProcessedWordPressContent } from '../utils/contentProcessor';

/**
 * WordPress Content component that automatically processes HTML content
 * to replace WordPress backend URLs with proxied URLs
 */
export default function WordPressContent({ 
  content, 
  className = "", 
  ...props 
}) {
  const processedContent = useProcessedWordPressContent(content);
  
  if (!processedContent) return null;
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: processedContent }}
      {...props}
    />
  );
}

/**
 * Safe content processor for any HTML content that might contain WordPress URLs
 * Use this as a drop-in replacement for dangerouslySetInnerHTML
 */
export function SafeWordPressHTML({ content, ...props }) {
  const processedContent = useProcessedWordPressContent(content);
  
  return {
    __html: processedContent || ''
  };
}