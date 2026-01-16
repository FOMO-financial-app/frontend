export const validatePeriod = (minValue, maxValue, period) => {
    if (!minValue == Number || !maxValue == Number || !period == Number) {
        return false;
    }
    if (period < 0 || maxValue < 0 || minValue < 0) {
        return false;
    }
    if (period < minValue || period > maxValue || minValue > maxValue) {
        return false;
    }
    return true;
}