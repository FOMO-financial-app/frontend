export const validateString = (minLength, maxLength, string) => {
    if (!minLength == Number || !maxLength == Number || string.trim().length === 0) {
        return false;
    }
    if ( minLength < 0 || maxLength < 0) {
        return false;
    }
    if (string.trim().length < minLength || string.trim().length > maxLength || minLength > maxLength) {
        return false;
    }
    return true;
}