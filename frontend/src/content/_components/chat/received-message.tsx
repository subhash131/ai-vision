import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";

import "highlight.js/styles/monokai.css";

hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("mdx", javascript);

const ReceivedMessage = ({ message }: { message: string }) => {
  return (
    <div className="w-full flex items-center justify-start">
      <div className="w-fit max-w-72 px-3 py-2 rounded-lg bg-[#212121] break-words overflow-x-auto">
        <div className="prose prose-invert max-w-none w-full text-xs">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]} children={message} />
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessage;
