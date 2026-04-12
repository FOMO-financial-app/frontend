import { logger } from "../../../shared";
import { mapBands } from "../models";

export const fetchBandsData = (serviceMethod, symbol, period, secondParam, message, setBands) => {
        serviceMethod(symbol, period, secondParam)
            .then(result => {
                const data = result.data;
                const values = mapBands(data);
                setBands(values);
            })
            .catch(error => {
                setBands([]);
        logger.error({message}, error);
    });
};