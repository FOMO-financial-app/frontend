export const validatePrecision = (value, min, max) => {
    if (value === "" || value === null || value === undefined) return false;
    if (min === "" || min === null || min === undefined) return false;
    if (max === "" || max === null || max === undefined) return false;

    const num = parseFloat(value);
    const minnum = parseFloat(min);
    const maxnum = parseFloat(max);

    if (num > maxnum || num <= minnum) return false;

    const strMax = max.toString();
    const [intMaxPart, decMaxPart] = strMax.split(".");
    const maxLength = intMaxPart.replace("-", "").length;
    const maxDecimalLength = decMaxPart.length;

    const strValue = value.toString();
    const [intPart, decPart] = strValue.split(".");

    if (intPart.replace("-", "").length > maxLength) return false;

    if (decPart && decPart.length > maxDecimalLength) return false;

    return true;
};