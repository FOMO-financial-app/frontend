export const bandsCheck = (query, bands, period, bandsPeriod, setBandsPeriod, secondParam, bandsSecondParam, setBandsSecondParam,
     nextShow, fetchData, setShowBands) => {
        if (!nextShow) {
            setShowBands(false);
            return;
        }
        if (bands.length == 0 || period != bandsPeriod || secondParam != bandsSecondParam) {
            setBandsPeriod(period);
            setBandsSecondParam(secondParam)
            fetchData(query, period, secondParam);
        };
        setShowBands(true);
    };