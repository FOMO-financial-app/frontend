import { ResultCard } from "./ResultCard";

export const ResultsList = ({ list, editable = false, onEdit, onDelete }) => {
    if (!list || list.length === 0) {
        return <div className="no-data">No hay resultados que mostrar</div>;
    }
    
    return (
        <div className="results-list">
            {list.map(item => (
                <ResultCard 
                    key={item.id ?? item.symbol}
                    item={item}
                    editable={editable}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};