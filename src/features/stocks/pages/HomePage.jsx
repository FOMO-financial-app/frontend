import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stockService } from "../services";
import { StockTable } from "../components";
import { PaginationControls } from "../../../shared";
import TradingViewWidget from "../components/TradingViewWidget";
import "./HomePage.css"

export const HomePage = () => {
    const [ highlightedIndex, setHighlightedIndex ] = useState(-1);
    const [ list, setList ] = useState([]);  
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);
    const navigate = useNavigate();          
    const totalItems = 14;
    const searchPath = "stock-details"

    const fetchPageData = (page) => {
        stockService.page(page, totalItems)
            .then(result => {
                setList(result.data.data)
                setTotalPages(result.data.totalPages)
            })
            .catch(error => {
                setList([]);
                console.error("Error fetching stocks:", error)
            });
    };

    useEffect (() => {
        fetchPageData(currentPage);
    }, [currentPage]);

    const handleRowClick = (symbol) => {
        setTimeout(() => {
            navigate(`${searchPath}/${symbol}`);
        }, 50);
    };

    const handleRowHover = (index) => {
        setHighlightedIndex(index);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
        <div className="full-width-widget-wrapper">
            <TradingViewWidget/>
        </div>
        <div className="home-page-container">
            <StockTable
                list={list}
                highlightedIndex={highlightedIndex}
                onRowClick={handleRowClick}
                onRowHover={handleRowHover}
            />
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
        </>
    )
}