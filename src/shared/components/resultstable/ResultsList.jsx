import { ResultCard } from "./ResultCard";

export const ResultsList = ({ list, editable = false, onEdit, onDelete }) => {
    if (!list || list.length === 0) {
        return <div className="no-data">
            <span className="no-data-icon">💸</span>
            <p className="no-data-text">No hay resultados que mostrar</p>
            <p className="no-data-text">¡Publicá tu primer resultado y empezá a registrar tus operaciones!</p>
        </div>; 
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