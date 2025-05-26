import React, {useState} from "react";
import { IoIosSearch } from "react-icons/io";


export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch ("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then(json => {
        const results = json.filter((user) => {
            return ( 
                value &&
                user && 
                user.id && 
                user.name.toLowerCase().includes(value)
                );
        });
setResults(results);
        });
    };

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return ( 
        <div className="input-wrapper">
        <IoIosSearch id="serach-icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input placeholder="Søg efter events her.." value={input} onChange={(e) => handleChange(e.target.value)} className="w-full border rounded px-3 py-2 pr-10" />
        </div>
        
     );
}