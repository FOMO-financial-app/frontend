export const BandsOptions = ({bandsError, title, color, setActiveInfo, info, setInfoOpen, icon, showBands, handleBandsToggle,
    bandsPeriod, setBandsPeriod, bandsMin, maxPeriod, secondParameter, secondParamValue, secondParamMax, setSecondParam }) => {
    return (
        <div className="option-container">
            <div className={`option-header ${bandsError ? 'has-error' : ''}`}>
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
                    <input type="checkbox" checked={showBands}
                        onChange={(e) => handleBandsToggle(e.target.checked)}
                    />
                    <span className="slider-round"/>
                </label>
            </div>
            <div className="option-params">
                <div className="param-row">
                    <label>Periodo:</label>
                    <input type="number" value={bandsPeriod} onChange={(e) => setBandsPeriod(e.target.value)}
                        className="input-small" />
                    {bandsError && (
                        <span className="error-text">
                            El período debe estar entre {bandsMin} y {maxPeriod}.
                        </span>
                    )}
                </div>
                <div className="param-row">
                    <label>{secondParameter}: <b>{secondParamValue}</b></label>
                    <input 
                        type="range" min="2" max={secondParamMax} 
                        value={secondParamValue} 
                        onChange={(e) => setSecondParam(e.target.value)} 
                    />
                </div>
            </div>
        </div>
    );
};
