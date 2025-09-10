import React from "react";
import { usePreviewNode } from "@faustwp/core";
import Layout from "@/components/Layout";

export default function Preview() {
  const { node, loading, error } = usePreviewNode();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !node) {
    return <div>Preview not found.</div>;
  }

  // Render the preview node using your existing page/single logic
  // You may want to switch on node.__typename for custom rendering
  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">{node.title || "Preview"}</h1>
        <div dangerouslySetInnerHTML={{ __html: node.content || "" }} />
      </div>
    </Layout>
  );
}
