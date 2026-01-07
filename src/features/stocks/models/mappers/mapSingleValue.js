export const mapSingleValue = ((apiResponse) => {
    if (!apiResponse) return [];
    
    return apiResponse.date.map((d, index) => {
        return {
            time: d,            
            value: +apiResponse.values[index],
        };
    });
});