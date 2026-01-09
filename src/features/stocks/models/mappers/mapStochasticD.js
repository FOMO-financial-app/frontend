export const mapStochasticD = ((apiResponse) => {
    if (!apiResponse) return [];
    
    return apiResponse.ddate.map((d, index) => {
        return {
            time: d,            
            value: +apiResponse.d[index]            
        };
    });
});