export const StockTable = ({ list, highlightedIndex, onRowClick, onRowHover, isLoading, pageSize }) => {
    if (isLoading) {
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
                    {[...Array(pageSize)].map((_, i) => (
                        <tr key={i}>
                            <td><div className="skeleton skeleton-cell" /></td>
                            <td><div className="skeleton skeleton-cell-wide" /></td>
                            <td><div className="skeleton skeleton-cell-sm" /></td>
                            <td><div className="skeleton skeleton-cell-sm" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    if (!list || list.length === 0) {
        return <div className="no-data">
            <span className="no-data-icon">🚧</span>
            <p className="no-data-text">No hay acciones que mostrar.</p>
            <p className="no-data-text">Por favor intente nuevamente más tarde.</p>
        </div>; 
    };

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