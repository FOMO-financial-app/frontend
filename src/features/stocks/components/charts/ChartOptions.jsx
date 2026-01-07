import { useState } from "react";
import "./ChartOptions.css";
import { validatePeriod, validateStochastic } from "../../services";

export const ChartOptions = ({ handleMainChannelCheck, handleSmaCheck, handleEnvelopesCheck, handleBollingerCheck, handleStochasticCheck,
    handleRSICheck, handleSRSICheck, showSma, smaMin, showEnvelopes, envMin, showBollinger, bollingerMin, showStochastic, kMin, dMin }) => {

    const [ smaPeriod, setSmaPeriod ] = useState(20);
    const [ envelopesPeriod, setEnvelopesPeriod ] = useState(20);
    const [ envPercentage, setEnvPercentage ] = useState(10);
    const [ bollingerPeriod, setBollingerPeriod ] = useState(20);
    const [ bollingerK, setBollingerK ] = useState(2);
    const [ stochasticPeriod, setStochasticPeriod ] = useState(20);
    const [ stochasticSmaPeriod, setStochasticSmaPeriod ] = useState(3);
    const [ rsiPeriod, setRsiPeriod ] = useState(9);
    const [ srsiPeriod, setSrsiPeriod ] = useState(9);    
    const [ smaError, setSmaError ] = useState(false);
    const [ envError, setEnvError ] = useState(false);
    const [ bollingerError, setBollingerError ] = useState(false);
    const [ stochasticError, setStochasticError ] = useState(false);

    const checkSma = (period) => {
        if (!validatePeriod(smaMin, period) && !showSma) {
            setSmaError(true);
            return;
        }
        setSmaError(false);
        handleSmaCheck(period);
    }

    const handleSmaToggle = (checked) => {
    if (!checked) {
        checkSma(smaPeriod);
        setSmaError(false);
        return;
    }
    checkSma(smaPeriod);
    };

    const checkEnvelopes = (period, percentage) => {
        if (!validatePeriod(envMin, period) && !showEnvelopes) {
            setEnvError(true);
            return;
        }
        setEnvError(false);
        handleEnvelopesCheck(period, percentage);
    }

    const handleEnvelopesToggle = (checked) => {
    if (!checked) {
        checkEnvelopes(envelopesPeriod, envPercentage);
        setEnvError(false);
        return;
    }
    checkEnvelopes(envelopesPeriod, envPercentage);
    };

    const checkBollinger = (period, k) => {
        if (!validatePeriod(bollingerMin, period) && !showBollinger) {
            setBollingerError(true);
            return;
        }
        setBollingerError(false);
        handleBollingerCheck(period, k);
    }

    const handleBollingerToggle = (checked) => {
    if (!checked) {
        checkBollinger(bollingerPeriod, bollingerK);
        setBollingerError(false);
        return;
    }
    checkBollinger(bollingerPeriod, bollingerK);
    };

    const checkStochastic = (kPeriod, dPeriod) => {
        if (!validateStochastic(kMin, kPeriod, dMin, dPeriod)) {
            setStochasticError(true)
            return;
        }
        setStochasticError(false);
        handleStochasticCheck(kPeriod, dPeriod);
    };

    // DISABLED: Stochastic chart and data fetching are not implemented.
    const handleStochasticToggle = (checked) => {
    if (!checked) {
        checkStochastic(kPeriod, dPeriod);
        setStochasticError(false);
        return;
    }
    checkStochastic(kPeriod, dPeriod);
    };

    return (
        <div className="chart-options-container">
            <h3 className="options-title">Indicadores</h3>

            <div className="option-container">
                <div className="option-header">
                    <span className="option-title">
                        Canal Madre
                        <span className="color-dot" style={{ backgroundColor: '#131722'}}/>
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
                </div>
            </div>

            <div className="option-container">
                <div className={`option-header ${envError ? 'has-error' : ''}`}>
                    <span className="option-title">
                        Bandas Envolventes
                        <span className="color-dot" style={{ backgroundColor: '#eaf829'}}/>
                    </span>
                    <label className="switch">
                        <input type="checkbox" checked={showEnvelopes}
                            onChange={() => handleEnvelopesToggle(envelopesPeriod, envPercentage)}
                        />
                        <span className="slider-round"/>
                    </label>
                </div>
                <div className="option-params">
                    <div className="param-row">
                        <label>Periodo:</label>
                        <input type="number" value={envelopesPeriod} onChange={(e) => setEnvelopesPeriod(e.target.value)}
                         className="input-small" />
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
                    </span>
                    <label className="switch">
                        <input type="checkbox" checked={showBollinger}
                            onChange={() => handleBollingerToggle(bollingerPeriod, bollingerK)}
                        />
                        <span className="slider-round"/>
                    </label>
                </div>
                <div className="option-params">
                    <div className="param-row">
                        <label>Periodo:</label>
                        <input type="number" value={bollingerPeriod} onChange={(e) => setBollingerPeriod(e.target.value)}
                         className="input-small" />
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
                <div className={`option-header ${stochasticError ? 'has-error' : ''}`}>
                    <span className="option-title">Oscilador Estocastico</span>                    
                    <label className="switch">
                        <input type="checkbox"
                        />
                        <span className="slider-round"/>
                    </label>
                </div>
                <div className="option-params">
                    <div className="param-row">
                        <label>Periodo (K):</label>
                        <input type="number" value={stochasticPeriod} onChange={(e) => setStochasticPeriod(e.target.value)}
                         className="input-small" />
                    </div>
                    <div className="param-row">
                        <label>Periodo (D):</label>
                        <input type="number" value={stochasticSmaPeriod} onChange={(e) => setStochasticSmaPeriod(e.target.value)}
                         className="input-small" />
                    </div>
                </div>
            </div>

            <div className="option-container">
                <div className="option-header">
                    <span className="option-title">RSI</span>                    
                    <label className="switch">
                        <input type="checkbox" onChange={() => handleRSICheck(rsiPeriod)}/>
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
                    <span className="option-title">RSI Suavizado</span>
                    <label className="switch">
                        <input type="checkbox" onChange={() => handleSRSICheck(srsiPeriod)}/>
                        <span className="slider-round"/>
                    </label>
                </div>
                <div className="option-params">
                    <div className="param-row">
                        <label>Periodo: <b>{srsiPeriod}</b></label>
                        <input 
                            type="range" min="7" max="14" step="1"
                            value={srsiPeriod} 
                            onChange={(e) => setSrsiPeriod(e.target.value)} 
                        />
                    </div>
                </div>
            </div>            
        </div>
    );
};