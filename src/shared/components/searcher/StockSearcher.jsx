import { useEffect, useState, useRef } from "react"
import { SearchInput } from "./SearchInput"
import { useNavigate } from 'react-router-dom';
import "./StockSearcher.css"
import { VirtualizedStockList } from "./VirtualizedStockList";
import { useDebounce } from "../../index";
import { stockService } from "../../../features"

export const StockSearcher = ({ searchPath }) => {
    const [ query, setQuery ] = useState("");
    const [ qresult , setqResult ] = useState([]);
    const [ isFocused, setIsFocused ] = useState(false);
    const [ highlightedIndex, setHighlightedIndex ] = useState(-1);
    const searcherRef = useRef(null);
    const inputRef = useRef(null);
    const virtualListRef = useRef(null);
    const navigate = useNavigate();
    const debouncedQuery = useDebounce(query, 500);

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
        const clickedHeader = e.target.closest(".virtual-header");
        const clickedRow = e.target.closest(".virtual-row");
        if (clickedHeader || clickedRow) return;
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

    //Filter the items in the backend that match the query.
    useEffect (() => {
        if (debouncedQuery.trim() === "") {
            setqResult([]);
            return;
        };

        stockService.find(debouncedQuery)
            .then(result => setqResult(result.data))
            .catch(error => {
                setqResult([]);
                console.error("Error fetching stocks:", error);
            });

    }, [debouncedQuery]);

    const handleKeyDown = (e) => {
        if (!isFocused || qresult.length === 0) return;
        
        let newIndex = highlightedIndex;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            newIndex = Math.min(highlightedIndex + 1, qresult.length - 1);
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            newIndex = Math.max(highlightedIndex - 1, 0);
        }

        if (newIndex !== highlightedIndex) {
            setHighlightedIndex(newIndex);
            virtualListRef.current?.scrollToIndex(newIndex);
            return;
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
        setTimeout(() => {
            navigate(`${searchPath}/${symbol}`);
        }, 50);
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
                <div className="search-dropdown-list">
                <VirtualizedStockList
                    ref={virtualListRef}
                    list={qresult}
                    highlightedIndex={highlightedIndex}
                    onRowClick={handleRowClick}
                    onRowHover={handleRowHover}
                />
                </div>
            )}            
        </div>
    );
}