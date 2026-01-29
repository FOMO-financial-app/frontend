import { ResultCard } from "./ResultCard";

export const ResultsList = ({ list }) => {
    if (!list || list.length === 0) {
        return <div className="no-data">No hay resultados</div>;
    }
    
    return (
        <div className="results-list">
            {list.map(item => (
                <ResultCard key={item.id ?? item.symbol} item={item} />
            ))}
        </div>
    );
};