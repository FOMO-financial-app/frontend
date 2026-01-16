export const RsiOptions = ({title, color, setActiveInfo, info, setInfoOpen, icon, showRsi, handleRSICheck,
    rsiPeriod, setRsiPeriod }) => {
    return (
        <div className="option-container">
            <div className={"option-header"}>
                <span className="option-title">
                    {title}
                    <span className="color-dot" style={{ backgroundColor: color}}/>
                    <button
                        className="info-btn"
                        onClick={() => {
                            setActiveInfo(info);
                            setInfoOpen(true);
                        }}
                    >
                        <img
                            src={icon}
                            alt="Info"
                            className="info-icon"
                        />
                    </button>
                </span>
                <label className="switch">
                    <input type="checkbox" checked={showRsi}
                        onChange={(e) => handleRSICheck(rsiPeriod)}
                    />
                    <span className="slider-round"/>
                </label>
            </div>
            <div className="option-params">
                <div className="param-row">
                    <label>Periodo: <b>{rsiPeriod}</b></label>
                    <input 
                        type="range" min="7" max="14" 
                        value={rsiPeriod} 
                        onChange={(e) => setRsiPeriod(e.target.value)} 
                    />
                </div>
            </div>
        </div>
    );
};