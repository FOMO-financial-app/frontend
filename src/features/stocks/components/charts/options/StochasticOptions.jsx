export const StochasticOptions = ({stochasticKError, stochasticDError, title, setActiveInfo, info, setInfoOpen, icon, showStochastic,
     handleStochasticToggle, kPeriod, setKPeriod, kMin, maxPeriod, dPeriod, dMin, maxDPeriod, setDPeriod}) => {
    return (
        <div className="option-container">
            <div className={`option-header ${(stochasticKError || stochasticDError) ? 'has-error' : ''}`}>
                <span className="option-title">
                    {title}
                    <span className="color-dot" style={{ backgroundColor: '#1437aaff'}}/>
                    <span className="color-dot" style={{ backgroundColor: '#8d1111ff'}}/>
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
                    <input type="checkbox" checked={showStochastic}
                        onChange={(e) => handleStochasticToggle(e.target.checked)}
                    />
                    <span className="slider-round"/>
                </label>
            </div>
            <div className="option-params">
                <div className="param-row">
                    <label>Periodo (K):</label>
                    <input type="number" value={kPeriod} onChange={(e) => setKPeriod(e.target.value)}
                        className="input-small" />
                    {stochasticKError && (
                        <span className="error-text">
                            El período debe estar entre {kMin} y {maxPeriod}.
                        </span>
                    )}
                </div>
                <div className="param-row">
                    <label>Periodo (D):</label>
                    <input type="number" value={dPeriod} onChange={(e) => setDPeriod(e.target.value)}
                        className="input-small" />
                    {stochasticDError && (
                        <span className="error-text">
                            El período debe estar entre {dMin} y {maxDPeriod}.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};