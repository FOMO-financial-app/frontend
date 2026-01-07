export const mapBands = ((apiResponse) => {
    if (!apiResponse) return [];
    
    return apiResponse.date.map((d, index) => {
        return {
            time: d,            
            upperBand: +apiResponse.upperBand[index],
            lowerBand: +apiResponse.lowerBand[index]
        };
    });
});