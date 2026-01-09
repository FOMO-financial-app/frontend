import { useState } from "react";
import "./ChartOptions.css";
import { validatePeriod } from "../../services";

export const ChartOptions = ({ handleMainChannelCheck, handleSmaCheck, handleEnvelopesCheck, handleBollingerCheck, handleStochasticCheck,
    handleRSICheck, handleWRSICheck, showSma, showEnvelopes, showBollinger, showStochastic, showRsi, showWrsi, smaMin,  envMin,  bollingerMin,
      kMin, dMin, maxPeriod, maxDPeriod }) => {
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
    const [ stochasticError, setStochasticError ] = useState(false);
    
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
            setStochasticError(false);
            handleStochasticCheck(stochasticKPeriod, stochasticDPeriod, false);
            return;
        }
        if (!validatePeriod(kMin,maxPeriod,stochasticKPeriod) || (!validatePeriod(dMin,maxDPeriod,stochasticDPeriod)) 
            || stochasticDPeriod > stochasticKPeriod) {
            setStochasticError(true);
            return;
        }
        setStochasticError(false);
        handleStochasticCheck(stochasticKPeriod, stochasticDPeriod, true);
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
                    <span className="option-title">
                        Oscilador Estocástico
                        <span className="color-dot" style={{ backgroundColor: '#1437aaff'}}/>
                        <span className="color-dot" style={{ backgroundColor: '#8d1111ff'}}/>
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
                    </div>
                    <div className="param-row">
                        <label>Periodo (D):</label>
                        <input type="number" value={stochasticDPeriod} onChange={(e) => setStochasticDPeriod(e.target.value)}
                         className="input-small" />
                    </div>
                </div>
            </div>

            <div className="option-container">
                <div className="option-header">
                    <span className="option-title">
                        RSI
                        <span className="color-dot" style={{ backgroundColor: '#29f84bff'}}/>
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
        </div>
    );
};