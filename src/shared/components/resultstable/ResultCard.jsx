import { TradeMethodTags } from "./TradeMethodTags";
import "./ResultCard.css"

export const ResultCard = ({ item }) => {
    const {
        symbol,
        profit,
        numberOfStocks,
        entryDate,
        entryPrice,
        exitDate,
        exitPrice,
        userName,
        tradeMethod
    } = item;

    const numericProfit = Number(
        String(profit).replace(",", ".")
    );
    
    return (
        <div className="result-card">
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
                
                <div className="tags-column">
                    <TradeMethodTags tradeMethod={tradeMethod}/>
                </div>                
            </div>
        </div>
    );
};