import { mapBands } from "../models";

export const fetchBandsData = (serviceMethod, symbol, period, secondParam, message, setBands) => {
        serviceMethod(symbol, period, secondParam)
            .then(result => {
                let data = result.data;
                let values = mapBands(data);
                setBands(values);
            })
            .catch(error => {
                setBands([]);
        console.error({message}, error);
    });
};