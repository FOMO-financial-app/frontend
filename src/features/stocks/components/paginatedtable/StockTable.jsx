export const StockTable = ({ list, highlightedIndex, onRowClick, onRowHover }) => {
    if (!list || list.length === 0) {
        return <div className="no-data-message">No hay acciones para mostrar.</div>; 
    }

    const StockRow = ({ item, index }) => {
        return (
            <tr
                className={index === highlightedIndex ? "highlighted" : ""}                
                onMouseEnter={() => onRowHover(index)}
                onMouseLeave={() => onRowHover(-1)}
                onClick={(e) => {
                    e.stopPropagation();
                    if (onRowClick) {
                        onRowClick(item.symbol);
                    }
                }}
                style={{ cursor: "pointer" }}
            >
                <td>{item.symbol}</td>
                <td>{item.name}</td>
                <td>{item.currency}</td>
                <td>{item.exchange}</td>
            </tr>
        );
    };

    return (
        <table className="main-stock-table">
            <thead>
                <tr className="table-header">
                    <th>Símbolo</th>
                    <th>Nombre</th>
                    <th>Moneda</th>
                    <th>Mercado</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (
                    <StockRow key={item.symbol || index} item={item} index={index} />
                ))}
            </tbody>
        </table>
    );
}