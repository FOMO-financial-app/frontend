import { useState } from "react";
import "./ChartOptions.css";
import { validatePeriod } from "../../services";
import icon from "../../../../assets/img/info-icon.svg";

export const ChartOptions = ({ handleMainChannelCheck, handleSmaCheck, handleEnvelopesCheck, handleBollingerCheck, handleStochasticCheck,
    handleRSICheck, handleWRSICheck, showSma, showEnvelopes, showBollinger, showStochastic, showRsi, showWrsi, smaMin,  envMin,  bollingerMin,
      kMin, dMin, maxPeriod, maxDPeriod, setActiveInfo, setInfoOpen }) => {
    const [ smaPeriod, setSmaPeriod ] = useState(20);
    const [ envelopesPeriod, setEnvelopesPeriod ] = useState(20);
    const [ envPercentage, setEnvPercentage ] = useState(10);
    const [ bollingerPeriod, setBollingerPeriod ] = useState(20);
    const [ bollingerK, setBollingerK ] = useState(2);
    const [ stochasticKPeriod, setStochasticKPeriod ] = useState(20);
    const [ stochasticDPeriod, setStochasticDPeriod ] = useState(3);
    const [ rsiPeriod, setRsiPeriod ] = useState(9);
    const [ wrsiPeriod, setSrsiPeriod ] = useState(9);    
    const [ smaError, setSmaError ] = useState(false);
    const [ envError, setEnvError ] = useState(false);
    const [ bollingerError, setBollingerError ] = useState(false);
    const [ stochasticKError, setStochasticKError ] = useState(false);
    const [ stochasticDError, setStochasticDError ] = useState(false);
    
    const handleSmaToggle = (checked) => {
        if (!checked) {
            setSmaError(false);
            handleSmaCheck(smaPeriod, false);
            return;
        }
        if (!validatePeriod(smaMin, maxPeriod, smaPeriod)) {
            setSmaError(true);
            return;
        }
        setSmaError(false);
        handleSmaCheck(smaPeriod, true);
    };

    const handleEnvelopesToggle = (checked) => {
        if (!checked) {        
            setEnvError(false);
            handleEnvelopesCheck(envelopesPeriod, envPercentage, false);
            return;
        }
        if (!validatePeriod(envMin, maxPeriod, envelopesPeriod)) {
            setEnvError(true);
            return;
        }
        setEnvError(false);
        handleEnvelopesCheck(envelopesPeriod, envPercentage, true);
    };

    const handleBollingerToggle = (checked) => {
        if (!checked) {
            setBollingerError(false);
            handleBollingerCheck(bollingerPeriod, bollingerK, false);
            return;
        }
        if (!validatePeriod(bollingerMin, maxPeriod, bollingerPeriod)) {
            setBollingerError(true);
            return;
        }
        setBollingerError(false);
        handleBollingerCheck(bollingerPeriod, bollingerK, true);
    };

    const handleStochasticToggle = (checked) => {
        if (!checked) {
            setStochasticKError(false);
            setStochasticDError(false);
            handleStochasticCheck(stochasticKPeriod, stochasticDPeriod, false);
            return;
        }
        if (!validatePeriod(kMin,maxPeriod,stochasticKPeriod)) {
            setStochasticKError(true);
            return;
        }
        if (!validatePeriod(dMin,maxDPeriod,stochasticDPeriod) || (Number(stochasticDPeriod) > Number(stochasticKPeriod))) {
            setStochasticDError(true);
            return;
        }
        setStochasticKError(false);
        setStochasticDError(false);
        handleStochasticCheck(stochasticKPeriod, stochasticDPeriod, true);
    };

    return (
        <div className="chart-options-container">
            <div className="option-container">
                <div className="option-header">
                    <span className="option-title">
                        Canal Madre
                        <span className="color-dot" style={{ backgroundColor: '#131722'}}/>
                        <button
                            className="info-btn"
                            onClick={() => {
                                setActiveInfo("mainchannel");
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
                        <input type="checkbox" onChange={handleMainChannelCheck}/>
                        <span className="slider-round"/>
                    </label>  
                </div>                
            </div>

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

            <div className="option-container">
                <div className={`option-header ${envError ? 'has-error' : ''}`}>
                    <span className="option-title">
                        Bandas Envolventes
                        <span className="color-dot" style={{ backgroundColor: '#eaf829'}}/>
                        <button
                            className="info-btn"
                            onClick={() => {
                                setActiveInfo("envelopes");
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
                        <input type="checkbox" checked={showEnvelopes}
                            onChange={(e) => handleEnvelopesToggle(e.target.checked)}
                        />
                        <span className="slider-round"/>
                    </label>
                </div>
                <div className="option-params">
                    <div className="param-row">
                        <label>Periodo:</label>
                        <input type="number" value={envelopesPeriod} onChange={(e) => setEnvelopesPeriod(e.target.value)}
                         className="input-small" />
                        {envError && (
                            <span className="error-text">
                                El período debe estar entre {envMin} y {maxPeriod}.
                            </span>
                        )}
                    </div>
                    <div className="param-row">
                        <label>Desviación: <b>{envPercentage}%</b></label>
                        <input 
                            type="range" min="2" max="15" 
                            value={envPercentage} 
                            onChange={(e) => setEnvPercentage(e.target.value)} 
                        />
                    </div>
                </div>
            </div>

            <div className="option-container">
                <div className={`option-header ${bollingerError ? 'has-error' : ''}`}>
                    <span className="option-title">
                        Bandas de Bollinger
                        <span className="color-dot" style={{ backgroundColor: '#e029f8'}}/>
                        <button
                            className="info-btn"
                            onClick={() => {
                                setActiveInfo("bollinger");
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
                        <input type="checkbox" checked={showBollinger}
                            onChange={(e) => handleBollingerToggle(e.target.checked)}
                        />
                        <span className="slider-round"/>
                    </label>
                </div>
                <div className="option-params">
                    <div className="param-row">
                        <label>Periodo:</label>
                        <input type="number" value={bollingerPeriod} onChange={(e) => setBollingerPeriod(e.target.value)}
                         className="input-small" />
                        {bollingerError && (
                            <span className="error-text">
                                El período debe estar entre {bollingerMin} y {maxPeriod}.
                            </span>
                        )}
                    </div>
                    <div className="param-row">
                        <label>Multiplicador (K): <b>{bollingerK}</b></label>
                        <input 
                            type="range" min="2" max="5" step="1"
                            value={bollingerK} 
                            onChange={(e) => setBollingerK(e.target.value)} 
                        />
                    </div>
                </div>
            </div>

            <div className="option-container">
                <div className="option-header">
                    <span className="option-title">
                        RSI
                        <span className="color-dot" style={{ backgroundColor: '#29f84bff'}}/>
                        <button
                            className="info-btn"
                            onClick={() => {
                                setActiveInfo("rsi");
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
                            onChange={() => handleRSICheck(rsiPeriod)}/>
                        <span className="slider-round"/>
                    </label>
                </div>
                <div className="option-params">
                    <div className="param-row">
                        <label>Periodo: <b>{rsiPeriod}</b></label>
                        <input 
                            type="range" min="7" max="14" step="1"
                            value={rsiPeriod} 
                            onChange={(e) => setRsiPeriod(e.target.value)} 
                        />
                    </div>
                </div>
            </div>

            <div className="option-container">
                <div className="option-header">
                    <span className="option-title">
                        RSI de Wilder
                        <span className="color-dot" style={{ backgroundColor: '#29cff8ff'}}/>
                        <button
                            className="info-btn"
                            onClick={() => {
                                setActiveInfo("wrsi");
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
                        <input type="checkbox" checked={showWrsi}
                            onChange={() => handleWRSICheck(wrsiPeriod)}/>
                        <span className="slider-round"/>
                    </label>
                </div>
                <div className="option-params">
                    <div className="param-row">
                        <label>Periodo: <b>{wrsiPeriod}</b></label>
                        <input 
                            type="range" min="7" max="14" step="1"
                            value={wrsiPeriod} 
                            onChange={(e) => setSrsiPeriod(e.target.value)} 
                        />
                    </div>
                </div>
            </div>

            <div className="option-container">
                <div className={`option-header ${(stochasticKError || stochasticDError)  ? 'has-error' : ''}`}>
                    <span className="option-title">
                        Oscilador Estocástico
                        <span className="color-dot" style={{ backgroundColor: '#1437aaff'}}/>
                        <span className="color-dot" style={{ backgroundColor: '#8d1111ff'}}/>
                        <button
                            className="info-btn"
                            onClick={() => {
                                setActiveInfo("stochastic");
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
                        <input type="number" value={stochasticKPeriod} onChange={(e) => setStochasticKPeriod(e.target.value)}
                         className="input-small" />
                        {stochasticKError && (
                            <span className="error-text">
                                El período debe estar entre {kMin} y {maxPeriod}.
                            </span>
                        )}
                    </div>
                    <div className="param-row">
                        <label>Periodo (D):</label>
                        <input type="number" value={stochasticDPeriod} onChange={(e) => setStochasticDPeriod(e.target.value)}
                         className="input-small" />
                        {stochasticDError && (
                            <span className="error-text">
                                El período debe estar entre {dMin} y {maxDPeriod}.
                            </span>
                        )}
                    </div>
                </div>
            </div>            
        </div>
    );
};