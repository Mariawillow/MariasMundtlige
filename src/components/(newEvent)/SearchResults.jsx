import React from "react";

export const SearchResults = ({ result }) => {
    return (
    <div className="pt-4 pb-4 pl-2 pv-2" onClick={(e) => alert(`Du har klikket på ${result.name}`)}>
        {result.name}
    </div>
    );
};
