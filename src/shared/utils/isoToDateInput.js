export const isoToDateInput = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.substring(0, 10);
};