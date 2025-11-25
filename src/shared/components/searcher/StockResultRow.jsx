export const StockResultRow = ({ item, index, highlightedIndex, onRowClick, onRowHover }) => {
    return (
        <tr
            className={index === highlightedIndex ? "highlighted" : ""}
            onMouseEnter={() => onRowHover(index)}
            onMouseLeave={() => onRowHover(-1)}
            onClick={(e) => {
                e.stopPropagation();
                onRowClick(item.symbol);
            }}
            style={{ cursor: "pointer" }}
        >
            <td>{item.symbol}</td>
            <td>{item.name}</td>
        </tr>
    );
};
