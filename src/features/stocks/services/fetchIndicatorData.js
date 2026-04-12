import { logger } from "../../../shared/utils/logger";
import { mapSingleValue } from "../models";

export const fetchIndicatorData = (serviceMethod, symbol, period, message, setIndicator) => {
        serviceMethod(symbol, period)
            .then(result => {
                const data = result.data;
                const values = mapSingleValue(data);
                setIndicator(values);
            })
            .catch(error => {
                setIndicator([]);
        logger.error({message}, error);
    });
};