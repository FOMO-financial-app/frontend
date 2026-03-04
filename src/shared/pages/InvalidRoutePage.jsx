import "./InvalidRoutePage.css"

export const InvalidRoutePage = () => {
    return (
        <div className="no-data">
            <span className="no-data-icon">🧭</span>
            <p className="no-data-text">La página que buscás no existe</p>
            <p className="no-data-text">Revisá la URL o volvé al inicio.</p>
        </div>      
    )
}