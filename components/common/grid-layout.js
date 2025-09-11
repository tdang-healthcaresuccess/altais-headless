// grid-layout.js
import React from 'react';
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// The BlogPostCard component remains the same, but it's now internal to this file.
const BlogPostCard = ({ post }) => {
  // Function to truncate the excerpt
  const truncateText = (text, limit) => {
    if (!text) return '';

  // Strip HTML tags using regex (SSR-safe)
  let plainText = text.replace(/<[^>]+>/g, '');
  // Remove all builder text surrounded by brackets starting with et_pb_
  plainText = plainText.replace(/\[et_pb_[^\]]*\]/g, '');
  // Remove ending builder text like [/et_pb_button], [/et_pb_column], [/et_pb_post_title]
  plainText = plainText.replace(/\[\/et_pb_[^\]]*\]/g, '');
  // Remove any text inside brackets [ ... ]
  plainText = plainText.replace(/\[[^\]]*\]/g, '');
  // Remove special hex codes like &#8211; and similar
  plainText = plainText.replace(/&#\d+;/g, '');
  // Remove unicode non-breaking spaces and other invisible chars
  plainText = plainText.replace(/[\u00A0-\u200F]/g, '');

    if (plainText.length <= limit) {
      return plainText;
    }
    return plainText.substring(0, limit) + '...';
  };

  return (
    <div className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
      <div className="block border border-gray-200 rounded-lg mb-6 overflow-hidden">
        {post.featuredImage?.node?.sourceUrl && (
          <a href={post.uri}>
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              className="object-cover min-h-[170px] w-full max-h-[170px] rounded-lg"
              width={500}
              height={170}
            />
          </a>
        )}
      </div>
      <div className="block flex-grow">
        <a href={post.uri}>
          <h3 className="text-2xl font-bold leading-8 text-blue-900 mb-3 hover:underline">
            {post.title}
          </h3>
        </a>
        <p className="text-lg leading-8 text-gray-600 mb-7">
          {truncateText(post.excerpt, 150)}
        </p>
      </div>
      <a
        href={post.uri}
        className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-gray-200 text-lg leading-6 text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        Read More
        <ChevronRight className="w-5 h-5" />
      </a>
    </div>
  );
};

// The main component that takes a list of posts and renders them in a grid.
export default function GridLayout({ posts }) {
  return (
    <div className="flex flex-wrap gap-10 items-stretch justify-center">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
