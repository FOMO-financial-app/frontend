import { useState } from "react";
import { isoToLocalDate } from "../../utils/";
import { ResultEdit } from "./ResultEdit.jsx"
import { TradeMethodTags } from "./TradeMethodTags";
import { TradeMethodTagsMobile } from "./TradeMethodTagsMobile.jsx";
import { useWindowWidth } from "../../hooks/useWindowWidth.js";
import editicon from "../../../assets/img/edit-icon.svg"
import "./ResultCard.css"

export const ResultCard = ({ item, editable, onEdit, onDelete }) => {
    const width = useWindowWidth();
    const isMobile = width <= 800;
    const [ drawerOpen, setDrawerOpen ] = useState(false);

    const {
        symbol,
        profit,
        numberOfStocks,
        entryPrice,
        exitPrice,
        userName,
        tradeMethod
    } = item;

    const entryDate = isoToLocalDate(item.entryDate)
    const exitDate = isoToLocalDate(item.exitDate)

    const numericProfit = Number(
        String(profit).replace(",", ".")
    );
    
    return (
        <div className="result-card">
            <div className="result-card-container">
                <div className="result-card-header">
                    <div className="trade-dates">
                        <div className="date-block">
                            <span className="date">{entryDate}</span>
                            <span className="price">${entryPrice}</span>
                        </div>
                    
                        <div className="date-block">
                            <span className="date">{exitDate}</span>
                            <span className="price">${exitPrice}</span>
                        </div>
                    </div>                
                    <div className="user">{userName}</div>
                </div>
            
                <div className="result-card-body">
                    <div className="symbol-column">
                        <strong className="symbol">{symbol}</strong>
                    </div>
                    
                    <div className="metric-column">
                        <span className="metric-label">
                            Ganancia:
                        </span>
                        <span className={`profit ${numericProfit > 0 ? "positive" : numericProfit < 0 ? "negative" : "neutral"}`}>
                            ${profit}
                        </span>        
                    </div>

                    <div className="metric-column">
                        <span className="metric-label">
                            Volumen:
                        </span>
                        <span className="volume-value">{numberOfStocks}</span>        
                    </div>
                
                    {!isMobile && (
                        <div className="tags-column">
                            <TradeMethodTags tradeMethod={tradeMethod}/>
                        </div>
                    )}
                </div>

                {isMobile && <TradeMethodTagsMobile tradeMethod={tradeMethod} />}            
            </div>

            {editable && (
                <img
                    src={editicon}
                    onClick={() => setDrawerOpen(true)}
                    className="result-edit-icon"
                />
            )}

            {drawerOpen && (
                <ResultEdit
                    open={drawerOpen}
                    item={item}
                    onClose={() => setDrawerOpen(false)}
                    editResult={onEdit}
                    deleteResult={onDelete}
                />
            )}            
        </div>
    );
};