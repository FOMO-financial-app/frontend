export const resultCreateDTO = ((symbol, entryPrice, exitPrice, numberOfStocks, entryDate, exitDate, tradeMethod) => {
    if (!symbol || !entryPrice || !exitPrice || !numberOfStocks || !entryDate ||
        !exitDate || !tradeMethod) return {};
    
    const resultPostDTO = {
        "symbol": symbol,
        "entryPrice": entryPrice,
        "exitPrice": exitPrice,
        "numberOfStocks": numberOfStocks,
        "entryDate": entryDate,
        "exitDate": exitDate,
        "tradeMethod": tradeMethod
    };

    return resultPostDTO;
})