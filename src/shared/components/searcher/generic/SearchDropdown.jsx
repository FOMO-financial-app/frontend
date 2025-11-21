export const SearchDropdown = ({ results, RenderRow, headers, highlightedIndex }) => {
    if (!results || results.length === 0) {
        return null; 
    }

    return (
        <table className="search-dropdown-table">
            {headers && headers.length > 0 && (
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {results.map((item, index) => (
                    <RenderRow 
                        key={index}
                        item={item}
                        index={index}
                        highlightedIndex={highlightedIndex}
                    />
                ))}
            </tbody>
        </table>
    );
}