import { useEffect, useState } from "react";
import { PaginationControls, ResultsList } from "../../../shared";
import "./BoardPage.css"

export const BoardPage = () => {
    const [ list, setList ] = useState([]);  
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);          

    useEffect (() => {
        let results = [{
        symbol: "AA",
        entryPrice: "11",
        exitPrice: "11,5",
        profit: "0,5",
        numberOfStocks: "3",
        entryDate: "11/01/2026",
        exitDate: "27/01/2026",
        tradeMethod: {
            "sma": true,
            "bollinger": false,
            "stochastic": false,
            "rsi": false,
            "other": false
        },
        userName: "Alejandro"
    },
    {
        symbol: "BB",
        entryPrice: "15",
        exitPrice: "10",
        profit: "-5",
        numberOfStocks: "7",
        entryDate: "25/01/2026",
        exitDate: "24/01/2026",
        tradeMethod: {
            "sma": true,
            "bollinger": true,
            "stochastic": true,
            "rsi": false,
            "other": true
        },
        userName: "Alejandro"
    }
    ]

    setList(results)

    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
        <div className="board-page-container">
            <ResultsList
                list={list}
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