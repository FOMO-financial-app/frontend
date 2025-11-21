import { useEffect, useState, useRef } from "react"
import { SearchInput, SearchDropdown } from "./generic"
import { StockResultRow } from "./StockResultRow";
import { useNavigate } from 'react-router-dom';
import "./StockSearcher.css"

//TestList. Fetching list and context is not implemented yet.
const useListContext = () => {
    const initialList = [
        { Símbolo: 'AAPL', Nombre: 'Apple' },
        { Símbolo: 'MELI', Nombre: 'Mercado Libre' },
        { Símbolo: 'NVDA', Nombre: 'Nvidia' },
        { Símbolo: 'META', Nombre: 'Meta' },
    ];

    return initialList;
};

export const StockSearcher = ({ searchPath }) => {
    const [ query, setQuery] = useState("");
    const [ qresult , setqResult] = useState([]);
    const [ isFocused, setIsFocused] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const searcherRef = useRef(null);
    const navigate = useNavigate();

    const list = useListContext();

    let headers = [];

    if (list && list.length > 0) {
        headers = Object.keys(list[0]);
    }

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setHighlightedIndex(-1);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (highlightedIndex >= 0) {
            const selected = qresult[highlightedIndex].Símbolo;
            navigate(`${searchPath}/${selected}`);
            return;
        }

        if (qresult.length > 0) {
            const firstmatch = qresult[0].Símbolo;
            navigate(`${searchPath}/${firstmatch}`);
            return;
        }

        const url = `${searchPath}/${query}`; 
        navigate(url);
    };
    
    const handleFocus = () => setIsFocused(true);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searcherRef.current && !searcherRef.current.contains(event.target)) {
                setIsFocused(false);
                setHighlightedIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect (() => {
        if (query.trim() === "") {
            setqResult(list);
            return;
        };

        const filtered = list.filter(item => 
            item.Símbolo.toLowerCase().startsWith(query.toLowerCase()) ||
            item.Nombre.toLowerCase().startsWith(query.toLowerCase())
        );

        setqResult(filtered);
    }, [query]);

    const handleKeyDown = (e) => {
        if (!isFocused || qresult.length === 0) return;
        
        if (e.key === "ArrowDown") {
            setHighlightedIndex(i => Math.min(i + 1, qresult.length - 1));
        }

        if (e.key === "ArrowUp") {
            setHighlightedIndex(i => Math.max(i - 1, 0));
        }
        
        if (e.key === "Enter") {
            if (highlightedIndex >= 0) {
                setQuery(qresult[highlightedIndex].Símbolo);
                setIsFocused(false);
            }
        }
    };

    return (
        <div ref={searcherRef} onClick={handleFocus} className="stock-search-container">
            <SearchInput 
                value={query}
                onChange={handleChange}
                onSubmitSearch={handleSearchSubmit}
                onKeyDown={handleKeyDown}
            />
            {isFocused && qresult.length > 0 && (
                <SearchDropdown
                    results={qresult}
                    RenderRow={StockResultRow}
                    headers={headers}
                    highlightedIndex={highlightedIndex}
                />
            )}            
        </div>
    );
}