import "./AlertCard.css"

export const AlertCard = ({ alerts, onCheck}) => {
    return (
        <div className="alert-card">
            <div className="alert-card-title">Alertas</div>
            <div className="alert-grid">
                {alerts.map(alert => (
                    <label key={alert.key} className="alert-item">
                        <input
                        type="checkbox"
                        checked={alert.enabled}
                        onChange={() => onCheck(alert.key)}
                        />
                        <span className={`tag tag-${alert.key}`}>
                            {alert.label}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}