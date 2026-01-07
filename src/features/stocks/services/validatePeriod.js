export const validatePeriod = (minValue, period) => {
    if (!minValue == Number || (!period == Number)) {
        return false;
    }
    if (period < 0 || minValue < 0) {
        return false;
    }
    if (period < minValue) {
        return false;
    }
    return true;
}