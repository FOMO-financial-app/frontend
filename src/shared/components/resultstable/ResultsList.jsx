import { ResultCard } from "./ResultCard";

export const ResultsList = ({ list, editable = false, onEdit, onDelete, isLoading, pageSize }) => {
    if (isLoading) {
        return (
            <div className="results-list">
                {[...Array(pageSize)].map((_, i) => (
                    <div key={i} className="result-card">
                        <div className="result-card-container">
                            <div className="result-card-header">
                                <div className="skeleton skeleton-header-dates" />
                                <div className="skeleton skeleton-header-user" />
                            </div>
                            <div className="result-card-body">
                                <div className="skeleton skeleton-symbol" />
                                <div className="skeleton skeleton-metric" />
                                <div className="skeleton skeleton-metric" />
                                <div className="skeleton skeleton-tags" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (!list || list.length === 0) {
        return <div className="no-data">
            <span className="no-data-icon">💸</span>
            <p className="no-data-text">No hay resultados que mostrar.</p>
            <p className="no-data-text">¡Publicá tu primer resultado y empezá a registrar tus operaciones!</p>
        </div>; 
    };
    
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