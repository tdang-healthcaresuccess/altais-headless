import { WordPressImage, WordPressFileLink, WordPressMedia } from '../components/WordPressImage';
import { useProxiedFileUrl } from '../utils/imageProxy';

/**
 * Example WordPress Content Component
 * Demonstrates how to handle various WordPress file types
 */
export default function WordPressContent({ post }) {
  return (
    <article>
      {/* Featured Image - automatically proxied */}
      {post.featuredImage?.node?.sourceUrl && (
        <WordPressImage
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          width={800}
          height={400}
          className="rounded-lg shadow-md"
        />
      )}

      {/* Post Content */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Document Downloads Section */}
      {post.acfFields?.documents && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Downloads</h3>
          <div className="space-y-2">
            {post.acfFields.documents.map((doc, index) => (
              <WordPressFileLink
                key={index}
                src={doc.url}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                download
              >
                <DocumentIcon className="w-5 h-5" />
                <span>{doc.title || `Document ${index + 1}`}</span>
              </WordPressFileLink>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {post.acfFields?.gallery && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {post.acfFields.gallery.map((image, index) => (
              <WordPressImage
                key={index}
                src={image.url}
                alt={image.alt}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        </section>
      )}

      {/* Video Section */}
      {post.acfFields?.featuredVideo && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Featured Video</h3>
          <WordPressMedia
            src={post.acfFields.featuredVideo.url}
            className="w-full max-w-4xl mx-auto rounded-lg"
            controls
          />
        </section>
      )}

      {/* Audio Section */}
      {post.acfFields?.podcastAudio && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Podcast</h3>
          <WordPressMedia
            src={post.acfFields.podcastAudio.url}
            className="w-full"
            controls
          />
        </section>
      )}

      {/* Mixed Media Section */}
      {post.acfFields?.mediaItems && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Media</h3>
          <div className="space-y-4">
            {post.acfFields.mediaItems.map((media, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{media.title}</h4>
                <WordPressMedia
                  src={media.url}
                  alt={media.alt}
                  className="w-full"
                />
                {media.description && (
                  <p className="text-gray-600 text-sm mt-2">{media.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

/**
 * Custom hook for WordPress file URLs
 * Useful when you need the proxied URL directly
 */
export function useWordPressFileUrl(fileUrl) {
  return useProxiedFileUrl(fileUrl);
}

/**
 * Simple download button for WordPress files
 */
export function DownloadButton({ fileUrl, fileName, className }) {
  const proxiedUrl = useProxiedFileUrl(fileUrl);
  
  if (!proxiedUrl) return null;
  
  return (
    <a
      href={proxiedUrl}
      download={fileName}
      className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${className}`}
    >
      <DownloadIcon className="w-4 h-4 mr-2" />
      Download {fileName || 'File'}
    </a>
  );
}

/**
 * WordPress PDF Viewer Component
 */
export function WordPressPDFViewer({ pdfUrl, className }) {
  const proxiedUrl = useProxiedFileUrl(pdfUrl);
  
  if (!proxiedUrl) return null;
  
  return (
    <iframe
      src={proxiedUrl}
      className={`w-full h-96 border rounded-lg ${className}`}
      title="PDF Viewer"
    />
  );
}