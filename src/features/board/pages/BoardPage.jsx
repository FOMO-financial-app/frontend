import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { resultService } from "../services"
import { PaginationControls, ResultsList, mapTradeResults, ResultEdit } from "../../../shared";
import "./BoardPage.css"

export const BoardPage = () => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);    
    const { isAuthenticated } = useAuth0();
    const [ resultsList, setResultsList ] = useState([]);
    const [ drawerOpen, setDrawerOpen ] = useState(false); 
    const totalItems = 10;        

    const tradeMethod = {
        sma: false,
        bollinger: false,
        stochastic: false,
        rsi: false,
        other: false
    };

    const item = {
        "symbol": "A",
        "entryPrice": 0,
        "exitPrice": 0,
        "numberOfStocks": 0,
        "entryDate": new Date().toISOString(),
        "exitDate": new Date().toISOString(),
        "tradeMethod": tradeMethod
    };

    const fetchResultPage = (page) => {
        resultService.page(page, totalItems)
            .then(result => {
                console.log("TradeResults:", result.data.data)
                let tradeResults = result.data.data.map(mapTradeResults)
                setResultsList(tradeResults)
                setTotalPages(result.data.totalPages)
            })
            .catch(error => {
                setResultsList([]);
                console.error("Error fetching results:", error)
            });
    };
    
    useEffect (() => {
        fetchResultPage(currentPage);
    }, [currentPage]); 

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleCreateResult = async (dto) => {
        await resultService.create(dto);
        if (currentPage == 1) {
            fetchResultPage(currentPage);
        } else {
            setCurrentPage(1);
        };
    };

    return (
        <>
        <div className="board-page-container">
            {isAuthenticated && (<button
                className="create-button"
                onClick={() => setDrawerOpen(true)}
            >
                Nuevo Post
            </button>)}

            <ResultsList
                list={resultsList}
                editable={false}
            />

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {drawerOpen && (
                <ResultEdit
                    open={drawerOpen}
                    item={item}
                    onClose={() => setDrawerOpen(false)}
                    createResult={handleCreateResult}
                />
            )} 
        </div>
        </>
    )
}