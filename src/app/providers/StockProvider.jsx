import { useState, useEffect } from "react";
import { StockContext } from "./stockContext.js";
import { stockService } from "../../features/stocks/services/stockService.js";

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    stockService.all().then(setStocks);
  }, []);

  return (
    <StockContext.Provider value={{ stocks }}>
      {children}
    </StockContext.Provider>
  );
}
