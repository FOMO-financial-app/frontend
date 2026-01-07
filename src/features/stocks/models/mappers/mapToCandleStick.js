export const mapToCandleStick = ((apiResponse) => {
    if (!apiResponse) return [];
    
    return apiResponse.map(v => ({
        time: v.datetime,
        open: +v.open,
        high: +v.high,
        low: +v.low,
        close: +v.close,
    }));
});