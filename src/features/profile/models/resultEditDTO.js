export const resultEditDTO = ((id, symbol, entryPrice, exitPrice, numberOfStocks, entryDate, exitDate, tradeMethod) => {
    if (!id && (!symbol || !entryPrice || !exitPrice || !numberOfStocks || !entryDate ||
        !exitDate || !tradeMethod)) return {};
    
    const resultUpdateDTO = {
        "tradeResultId": id,
        "symbol": symbol,
        "entryPrice": entryPrice,
        "exitPrice": exitPrice,
        "numberOfStocks": numberOfStocks,
        "entryDate": entryDate,
        "exitDate": exitDate,
        "tradeMethod": tradeMethod
    };

    return resultUpdateDTO;
})