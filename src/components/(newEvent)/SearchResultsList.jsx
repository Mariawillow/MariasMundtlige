import React from "react";
import {SearchResults} from "./SearchResults"

const SearchResultsList = ({results}) => {
    return ( <div className="results-list w-full bg-white flex flex-col mt-4 max-h-[300px] overflow-y-scroll rounded-[10px] ">
        {
            results.map((result, id) => {
                return <SearchResults result={result} key={id}  />
            })
        }

    </div> );
}
 
export default  SearchResultsList;