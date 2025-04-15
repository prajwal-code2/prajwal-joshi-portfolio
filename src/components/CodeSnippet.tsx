
import { useEffect, useRef } from "react";

const CodeSnippet = () => {
  return (
    <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-[550px] h-[400px] rounded-lg overflow-hidden shadow-2xl border border-gray-700 z-10">
      <img 
        src="/lovable-uploads/5035bd6c-9e33-40ed-8577-46f522c7f109.png" 
        alt="Code Snippet" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default CodeSnippet;
