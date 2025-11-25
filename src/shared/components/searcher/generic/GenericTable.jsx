export const GenericTable = ({ list, RenderRow, headers, highlightedIndex, onRowClick, onRowHover }) => {
    if (!list || list.length === 0) {
        return null; 
    }

    return (
        <table className="search-dropdown-table">
            {headers && headers.length > 0 && (
                <thead>
                    <tr className="table-header">
                        {headers.map(h => <th key={h.key}>{h.label}</th>)}
                    </tr>
                </thead>
            )}
            <tbody>
                {list.map((item, index) => (
                    <RenderRow
                        key={index}
                        item={item}
                        index={index}
                        highlightedIndex={highlightedIndex}
                        onRowClick={onRowClick}
                        onRowHover={onRowHover}
                    />
                ))}
            </tbody>
        </table>
    );
}