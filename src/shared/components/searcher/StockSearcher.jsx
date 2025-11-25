import { useEffect, useState, useRef } from "react"
import { SearchInput, GenericTable } from "./generic"
import { StockResultRow } from "./StockResultRow";
import { useNavigate } from 'react-router-dom';
import "./StockSearcher.css"

//TestList. Fetching list and context is not implemented yet.
const useListContext = () => {
    const initialList = [
        { symbol: 'AAPL', name: 'Apple' },
        { symbol: 'MELI', name: 'Mercado Libre' },
        { symbol: 'NVDA', name: 'Nvidia' },
        { symbol: 'META', name: 'Meta' },
    ];

    return initialList;
};

export const StockSearcher = ({ searchPath }) => {
    const [ query, setQuery ] = useState("");
    const [ qresult , setqResult ] = useState([]);
    const [ isFocused, setIsFocused ] = useState(false);
    const [ highlightedIndex, setHighlightedIndex ] = useState(-1);
    const searcherRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const list = useListContext();

    const headers = [
        { key: "symbol", label: "Símbolo" },
        { key: "name", label: "Nombre" }
    ];

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setHighlightedIndex(-1);
        setIsFocused(true)
    }

    //Search the user's input and redirect to a specific stock page.
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (highlightedIndex >= 0) {
            const selected = qresult[highlightedIndex].symbol;
            navigate(`${searchPath}/${selected}`);            
            return;
        }

        if (qresult.length > 0) {
            const firstmatch = qresult[0].symbol;
            navigate(`${searchPath}/${firstmatch}`);
            return;
        }

        const url = `*`;
        navigate(url);        
    };
    
    const handleFocus = (e) => {
        const isHeaderRow = e.target.closest(".table-header");
        if (isHeaderRow) return;
        setIsFocused(true);
        inputRef.current?.focus();
    }

    //Prevents the dropdown from closing when the user switches windows or browser tab.
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

    //Filter the items in the list that match the query.
    useEffect (() => {
        if (query.trim() === "") {
            setqResult(list);
            return;
        };

        const filtered = list.filter(item => 
            item.symbol.toLowerCase().startsWith(query.toLowerCase()) ||
            item.name.toLowerCase().startsWith(query.toLowerCase())
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
                setQuery(qresult[highlightedIndex].symbol);                
                setIsFocused(false);
            }            

            setIsFocused(false);
        }
    };

    const handleRowClick = (symbol) => {
        setQuery(symbol);
        setIsFocused(false);
        inputRef.current?.focus();
        navigate(`${searchPath}/${symbol}`);        
    };

    const handleRowHover = (index) => {
        setHighlightedIndex(index);
    };

    return (
        <div ref={searcherRef} onClick={handleFocus} className="stock-search-container">
            <SearchInput
                inputRef={inputRef} 
                value={query}
                onChange={handleChange}
                onSubmitSearch={handleSearchSubmit}
                onKeyDown={handleKeyDown}
            />
            {isFocused && qresult.length > 0 && (
                <GenericTable
                    list={qresult}
                    RenderRow={StockResultRow}
                    headers={headers}
                    highlightedIndex={highlightedIndex}
                    onRowClick={handleRowClick}
                    onRowHover={handleRowHover}
                />
            )}            
        </div>
    );
}