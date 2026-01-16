import { useState } from "react";
import { validatePeriod, handleIndicatorToggle } from "../../services";
import { MainChannelOptions, SmaOptions, BandsOptions, RsiOptions, StochasticOptions } from "./options";
import icon from "../../../../assets/img/info-icon.svg";
import "./ChartOptions.css";

export const ChartOptions = ({ handleMainChannelCheck, handleSmaCheck, handleEnvelopesCheck, handleBollingerCheck, handleStochasticCheck,
    handleRSICheck, handleWRSICheck, showSma, showEnvelopes, showBollinger, showStochastic, showRsi, showWrsi, setActiveInfo, setInfoOpen }) => {
    const [ smaPeriod, setSmaPeriod ] = useState(20);
    const [ envelopesPeriod, setEnvelopesPeriod ] = useState(20);
    const [ envPercentage, setEnvPercentage ] = useState(10);
    const [ bollingerPeriod, setBollingerPeriod ] = useState(20);
    const [ bollingerK, setBollingerK ] = useState(2);
    const [ stochasticKPeriod, setStochasticKPeriod ] = useState(20);
    const [ stochasticDPeriod, setStochasticDPeriod ] = useState(3);
    const [ rsiPeriod, setRsiPeriod ] = useState(9);
    const [ wrsiPeriod, setWrsiPeriod ] = useState(9);    
    const [ smaError, setSmaError ] = useState(false);
    const [ envError, setEnvError ] = useState(false);
    const [ bollingerError, setBollingerError ] = useState(false);
    const [ stochasticKError, setStochasticKError ] = useState(false);
    const [ stochasticDError, setStochasticDError ] = useState(false);
    const dMin = 1;
    const smaMin = 2;
    const envMin = 5;
    const bollingerMin = 5;
    const kMin = 5;
    const maxPeriod = 100;
    const maxDPeriod = 30;
    
    const handleSmaToggle = (checked) => {
        handleIndicatorToggle (checked, setSmaError, handleSmaCheck, smaMin, maxPeriod, smaPeriod)
    };

    const handleEnvelopesToggle = (checked) => {
        handleIndicatorToggle (checked, setEnvError, handleEnvelopesCheck, envMin, maxPeriod, envelopesPeriod, envPercentage)
    };

    const handleBollingerToggle = (checked) => {
        handleIndicatorToggle (checked, setBollingerError, handleBollingerCheck, bollingerMin, maxPeriod, bollingerPeriod, bollingerK)
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
            <MainChannelOptions
                setActiveInfo={setActiveInfo}
                setInfoOpen={setInfoOpen}
                icon={icon}
                handleMainChannelCheck={handleMainChannelCheck}
            />

            <SmaOptions
                smaError={smaError}
                setActiveInfo={setActiveInfo}
                setInfoOpen={setInfoOpen}
                icon={icon}
                showSma={showSma}
                handleSmaToggle={handleSmaToggle}
                smaPeriod={smaPeriod}
                setSmaPeriod={setSmaPeriod}
                smaMin={smaMin}
                maxPeriod={maxPeriod}
            />

            <BandsOptions
                bandsError={envError}
                title={"Bandas Envolventes"}
                color={'#eaf829'}
                setActiveInfo={setActiveInfo}
                info={"envelopes"}
                setInfoOpen={setInfoOpen}
                icon={icon}
                showBands={showEnvelopes}
                handleBandsToggle={handleEnvelopesToggle}
                bandsPeriod={envelopesPeriod}
                setBandsPeriod={setEnvelopesPeriod}
                bandsMin={envMin}
                maxPeriod={maxPeriod}
                secondParameter={"Desviación (%)"}
                secondParamValue={envPercentage}
                secondParamMax={"15"}
                setSecondParam={setEnvPercentage}
            />

            <BandsOptions
                bandsError={bollingerError}
                title={"Bandas de Bollinger"}
                color={'#e029f8'}
                setActiveInfo={setActiveInfo}
                info={"bollinger"}
                setInfoOpen={setInfoOpen}
                icon={icon}
                showBands={showBollinger}
                handleBandsToggle={handleBollingerToggle}
                bandsPeriod={bollingerPeriod}
                setBandsPeriod={setBollingerPeriod}
                bandsMin={bollingerMin}
                maxPeriod={maxPeriod}
                secondParameter={"Multiplicador (K)"}
                secondParamValue={bollingerK}
                secondParamMax={"5"}
                setSecondParam={setBollingerK}
            />

            <RsiOptions
                title={"RSI"}
                color={'#29f84bff'}
                setActiveInfo={setActiveInfo}
                info={"rsi"}
                setInfoOpen={setInfoOpen}
                icon={icon}
                showRsi={showRsi}
                handleRSICheck={handleRSICheck}
                rsiPeriod={rsiPeriod}
                setRsiPeriod={setRsiPeriod}
            />
            
            <RsiOptions
                title={"RSI de Wilder"}
                color={'#29cff8ff'}
                setActiveInfo={setActiveInfo}
                info={"wrsi"}
                setInfoOpen={setInfoOpen}
                icon={icon}
                showRsi={showWrsi}
                handleRSICheck={handleWRSICheck}
                rsiPeriod={wrsiPeriod}
                setRsiPeriod={setWrsiPeriod}
            />

            <StochasticOptions
                stochasticKError={stochasticKError}
                stochasticDError={stochasticDError}
                title={"Oscilador Estocástico"}
                setActiveInfo={setActiveInfo}
                info={"stochastic"}
                setInfoOpen={setInfoOpen}
                icon={icon}
                showStochastic={showStochastic}
                handleStochasticToggle={handleStochasticToggle}
                kPeriod={stochasticKPeriod}
                setKPeriod={setStochasticKPeriod}
                kMin={kMin}
                maxPeriod={maxPeriod}
                dPeriod={stochasticDPeriod}
                setDPeriod={setStochasticDPeriod}
                dMin={dMin}
                maxDPeriod={maxDPeriod}
            />           
        </div>
    );
};