import React from "react";

export const SearchResults = ({ result }) => {
  const title = result.titles?.[0]?.title || "Uden titel";
  const author = result.documentation?.[0]?.author || "Ukendt kunstner";

  return (
    <div className="pt-4 pb-4 pl-2 pr-2 border-b cursor-pointer hover:bg-gray-100" onClick={() => alert(`Du har klikket på: ${title}`)}>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{author}</p>
      </div>
    </div>
  );
};
