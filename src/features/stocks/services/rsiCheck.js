export const rsiCheck = (query, rsi, period, rsiPeriod, setPeriod, showRsi, setShow, fetchData, showOpposite, setShowOpposite ) => {
    if (rsi.length == 0 || (period != rsiPeriod && !showRsi)) {
        setPeriod(period);
        fetchData(query, period);
    };
    setShow(!showRsi);
    if (showOpposite == true) {
        setShowOpposite(false);
    }        
};