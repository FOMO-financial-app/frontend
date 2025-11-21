export const StockResultRow = ({ item, index, highlightedIndex }) => {
    return (
        <tr className={index === highlightedIndex ? "highlighted" : ""}>
            <td>{item.Símbolo}</td>
            <td>{item.Nombre}</td>
        </tr>
    );
}