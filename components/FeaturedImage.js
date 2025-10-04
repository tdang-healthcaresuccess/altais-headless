import Link from "next/link";
import Image from "next/image";
import styles from "../styles/featured-image.module.css";
import { useProxiedImageUrl } from "../utils/imageProxy";

export function FeaturedImage({
  post,
  classNames = "h-48 my-9 relative",
  uri = false,
  title = "",
}) {
  if (!post.featuredImage?.node?.sourceUrl) {
    return "";
  }

  const proxiedImageUrl = useProxiedImageUrl(post.featuredImage.node.sourceUrl);

  return (
    <div className={styles.wrapper + " " + classNames}>
      {typeof uri === "string" && uri.trim() !== "" ? (
        <Link href={uri} title={title} className={styles.link}>
          <Image
            src={proxiedImageUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        </Link>
      ) : (
        <Image
          src={proxiedImageUrl}
          alt={post.featuredImage.node.altText || post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      )}
    </div>
  );
}
