import { createContext, useContext } from "react";

export const StockContext = createContext(undefined);

export const useStockContext = () => {
    const context = useContext(StockContext);
    
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    
    return context;
};
