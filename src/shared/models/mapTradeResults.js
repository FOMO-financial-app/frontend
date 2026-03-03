export const mapTradeResults = (tr) => ({
    id: tr.tradeResultId,
    symbol: tr.symbol,
    entryPrice: tr.entryPrice.toString(),
    exitPrice: tr.exitPrice.toString(),
    profit: tr.profit.toString(),
    numberOfStocks: tr.numberOfStocks.toString(),
    entryDate: tr.entryDate,
    exitDate: tr.exitDate,
    tradeMethod: tr.tradeMethod,
    userName: tr.userName
});