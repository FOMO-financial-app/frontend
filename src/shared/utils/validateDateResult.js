export const validateDateResult = (entryDate, exitDate) => {
    const today = new Date().toISOString().substring(0, 10); 
    const minDate = "2026-01-01";

    if (entryDate < minDate || entryDate > today) return false;
    if (exitDate < minDate || exitDate > today) return false;
    if (entryDate > exitDate) return false;

    return true;
};