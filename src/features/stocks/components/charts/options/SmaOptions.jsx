export const SmaOptions = ({smaError, setActiveInfo, setInfoOpen, icon, showSma, handleSmaToggle,
     smaPeriod, setSmaPeriod, smaMin, maxPeriod}) => {
    return (
        <div className="option-container">
            <div className={`option-header ${smaError ? 'has-error' : ''}`}>
                <span className="option-title">
                    SMA
                    <span className="color-dot" style={{ backgroundColor: '#2962FF'}}/>
                    <button
                        className="info-btn"
                        onClick={() => {
                        setActiveInfo("sma");
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
                    <input type="checkbox" checked={showSma} 
                        onChange={(e) => handleSmaToggle(e.target.checked)}
                    />
                    <span className="slider-round"/>
                </label> 
            </div>
            <div className="option-params">
                <label>Periodo:</label>
                <input type="number" value={smaPeriod} onChange={(e) => setSmaPeriod(e.target.value)} className="input-small" />
                {smaError && (
                    <span className="error-text">
                        El período debe estar entre {smaMin} y {maxPeriod}.
                    </span>
                )}
            </div>
        </div>
    );
};