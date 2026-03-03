export const isoToLocalDate = ((isoDate) => {
    return new Date(isoDate).toLocaleDateString("es-AR");
});