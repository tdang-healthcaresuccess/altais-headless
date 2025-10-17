import { WordPressTemplate } from "@faustwp/core";

export default function Preview(props) {
  console.log("[Preview Page] Props:", props);
  console.log("[Preview Page] Query:", props?.router?.query);
  
  return <WordPressTemplate {...props} />;
}
