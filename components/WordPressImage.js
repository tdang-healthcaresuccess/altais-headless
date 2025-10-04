import Image from "next/image";
import { useProxiedImageUrl, useProxiedFileUrl, getFileType } from "../utils/imageProxy";

/**
 * WordPress Image component that automatically proxies WordPress images
 * to hide the backend WordPress URL from the frontend
 */
export default function WordPressImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority = false,
  sizes,
  style,
  onLoad,
  onError,
  ...props
}) {
  const proxiedSrc = useProxiedImageUrl(src);
  
  if (!proxiedSrc) {
    return null;
  }

  // Check if it's already a proxy URL to avoid double-processing
  const isProxyUrl = proxiedSrc.startsWith('/api/proxy-');
  
  const imageProps = {
    src: proxiedSrc,
    alt: alt || "",
    className,
    priority,
    style,
    onLoad,
    onError,
    // Disable Next.js optimization for proxy URLs to prevent double encoding
    unoptimized: isProxyUrl,
    ...props
  };

  if (fill) {
    imageProps.fill = true;
    if (sizes) imageProps.sizes = sizes;
  } else if (width && height) {
    imageProps.width = width;
    imageProps.height = height;
    if (sizes) imageProps.sizes = sizes;
  }

  return <Image {...imageProps} />;
}

/**
 * WordPress File Link component for documents, PDFs, etc.
 * Automatically proxies WordPress file URLs to hide backend URL
 */
export function WordPressFileLink({
  src,
  children,
  className,
  download = false,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}) {
  const proxiedSrc = useProxiedFileUrl(src);
  const fileType = getFileType(src);
  
  if (!proxiedSrc) {
    return null;
  }

  const linkProps = {
    href: proxiedSrc,
    className,
    target,
    rel,
    ...props
  };

  // Add download attribute for certain file types
  if (download || fileType === 'document') {
    linkProps.download = download === true ? '' : download;
  }

  return (
    <a {...linkProps}>
      {children || `Download ${fileType}`}
    </a>
  );
}

/**
 * WordPress Media component that handles any media type
 * (images, videos, audio, documents, etc.)
 */
export function WordPressMedia({
  src,
  alt,
  className,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  width,
  height,
  ...props
}) {
  const proxiedSrc = useProxiedFileUrl(src);
  const fileType = getFileType(src);
  
  if (!proxiedSrc) {
    return null;
  }

  // Handle different media types
  switch (fileType) {
    case 'image':
      return (
        <WordPressImage
          src={src}
          alt={alt}
          className={className}
          width={width}
          height={height}
          {...props}
        />
      );

    case 'video':
      return (
        <video
          src={proxiedSrc}
          className={className}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          width={width}
          height={height}
          {...props}
        />
      );

    case 'audio':
      return (
        <audio
          src={proxiedSrc}
          className={className}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          {...props}
        />
      );

    case 'document':
    case 'other':
    default:
      // For PDFs and documents, provide a link
      return (
        <WordPressFileLink
          src={src}
          className={className}
          {...props}
        >
          {alt || `Open ${fileType}`}
        </WordPressFileLink>
      );
  }
}

/**
 * Hook to get proxied WordPress image URL
 */
export function useWordPressImage(originalUrl) {
  return useProxiedImageUrl(originalUrl);
}

/**
 * Hook to get proxied WordPress file URL (any type)
 */
export function useWordPressFile(originalUrl) {
  return useProxiedFileUrl(originalUrl);
}