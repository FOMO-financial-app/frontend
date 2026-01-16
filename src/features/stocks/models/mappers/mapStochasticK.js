export const mapStochasticK = ((apiResponse) => {
    if (!apiResponse) return [];
    
    return apiResponse.kdate.map((d, index) => {
        return {
            time: d,            
            value: +apiResponse.k[index]            
        };
    });
});