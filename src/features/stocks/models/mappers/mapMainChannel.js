export const mapMainChannel = ((apiResponse) => {
    if (!apiResponse) return [];
    
    return apiResponse.values.map((v, index) => {
        return {
            time: v.datetime,            
            regression: +apiResponse.regression[index],
            upper: +apiResponse.upper[index],
            lower: +apiResponse.lower[index]
        };
    });
});