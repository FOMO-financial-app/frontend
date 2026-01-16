import { useState, useEffect } from "react"
import { stockService, fetchBandsData, fetchIndicatorData, rsiCheck, bandsCheck } from "../services"
import { mapToCandleStick, mapMainChannel, mapStochasticD, mapStochasticK } from "../models";
import { MainChart, ChartOptions, RsiChart, StochasticChart, ChartInfoDrawer } from "../components";
import { useParams } from "react-router-dom";
import "./StocksDetailsPage.css"

export const StockDetailsPage = () => {
    const { query } = useParams();
    const [ timeSeries, setTimeSeries ] = useState([]);
    const [ mainChannel, setMainChannel] = useState([]);
    const [ sma, setSma ] = useState([]);
    const [ envelopes, setEnvelopes ] = useState([]);
    const [ bollinger, setBollinger ] = useState([]);
    const [ stochasticK, setStochasticK ] = useState([]);
    const [ stochasticD, setStochasticD ] = useState([]);
    const [ rsi, setRsi ] = useState([]);
    const [ wrsi, setWrsi ] = useState([]);
    const [ showMainChannel, setShowMainChannel ] = useState(false);
    const [ showSma, setShowSma ] = useState(false);
    const [ showEnvelopes, setShowEnvelopes ] = useState(false);
    const [ showBollinger, setShowBollinger ] = useState(false);
    const [ showRsi, setShowRsi ] = useState(false);
    const [ showWrsi, setShowWrsi ] = useState(false);
    const [ showStochastic, setShowStochastic ] = useState(false);
    const [ smaPeriod, setSmaPeriod ] = useState(20);    
    const [ envPeriod, setEnvPeriod ] = useState(20);
    const [ envPercentage, setEnvPercentage ] = useState(10);     
    const [ bollingerPeriod, setBollingerPeriod ] = useState(20);
    const [ bollingerK, setBollingerK ] = useState(2);    
    const [ kPeriod, setKPeriod ] = useState(20);    
    const [ dPeriod, setDPeriod ] = useState(3);   
    const [ rsiPeriod, setRsiPeriod ] = useState(9);  
    const [ wrsiPeriod, setWrsiPeriod ] = useState(9);  
    const [ infoOpen, setInfoOpen] = useState(false);
    const [ activeInfo, setActiveInfo] = useState(null);

    const fetchDetailsData = (symbol) => {
        stockService.details(symbol)
            .then(result => {
                let data = result.data;
                let values = mapToCandleStick(data.values);
                setTimeSeries(values);
                let channel = mapMainChannel(data);
                setMainChannel(channel);
            })
            .catch(error => {
                setTimeSeries([]);
                setMainChannel([]);
                console.error("Error fetching stock details:", error);
            });
    };

    const fetchSmaData = (symbol, period) => {
        fetchIndicatorData( stockService.sma, symbol, period,
             "Error fetching SMA details:", setSma)
    };

    const fetchEnvelopesData = (symbol, period, percentage) => {
        fetchBandsData( stockService.envelopes, symbol, period, percentage,
             "Error fetching Evelopes Bands details:", setEnvelopes)
    };

    const fetchBollingerData = (symbol, period, k) => {        
        fetchBandsData( stockService.bollinger, symbol, period, k,
             "Error fetching Bollinger Bands details:", setBollinger)
    };

    const fetchRsiData = (symbol, period) => {
        fetchIndicatorData( stockService.rsi, symbol, period,
             "Error fetching RSI details:", setRsi)
    };

    const fetchWrsiData = (symbol, period) => {
        fetchIndicatorData( stockService.wrsi, symbol, period,
             "Error fetching WRSI details:", setWrsi)
    };

    const fetchStochasticData = (symbol, kperiod, dperiod) => {        
        stockService.stochastic(symbol, kperiod, dperiod)
            .then(result => {
                let data = result.data;
                let kvalue = mapStochasticK(data)
                let dvalue = mapStochasticD(data)
                setStochasticK(kvalue);
                setStochasticD(dvalue);
            })
            .catch(error => {
                setStochasticK([]);
                setStochasticD([]);
                console.error("Error fetching Stochastic details:", error);
            });
    };

    useEffect (() => {
        fetchDetailsData(query);
    }, []);

    const handleMainChannelCheck = () => {
        if (mainChannel.length == 0) {
            return;
        };
        setShowMainChannel(!showMainChannel);
    };

    const handleSmaCheck = (period, nextShow) => {
        if (!nextShow) {
            setShowSma(false);
            return;
        }
        if (sma.length == 0 || period != smaPeriod) {
            setSmaPeriod(period);
            fetchSmaData(query, period);
        }
        setShowSma(true);
    };

    const handleEnvelopesCheck = (period, percentage, nextShow) => {
        bandsCheck(query, envelopes, period, envPeriod, setEnvPeriod, percentage,
            envPercentage, setEnvPercentage, nextShow, fetchEnvelopesData, setShowEnvelopes)
    };

    const handleBollingerCheck = (period, k, nextShow) => {
        bandsCheck(query, bollinger, period, bollingerPeriod, setBollingerPeriod, k,
            bollingerK, setBollingerK, nextShow, fetchBollingerData, setShowBollinger)
    };

    const handleStochasticCheck = (kperiod, dperiod, nextShow) => {
        if (!nextShow) {
            setShowStochastic(false);
            return;
        }
        if (stochasticK.length == 0 || kperiod != kPeriod || dperiod != dPeriod) {
            setKPeriod(kperiod);
            setDPeriod(dperiod);
            fetchStochasticData(query, kperiod, dperiod);
        }
        setShowStochastic(true);
    };

    const handleRsiCheck = (period) => {
        rsiCheck(query, rsi,  period, rsiPeriod, setRsiPeriod, showRsi, setShowRsi,
            fetchRsiData, showWrsi, setShowWrsi)     
    };

    const handleWrsiCheck = (period) => {
        rsiCheck(query, wrsi,  period, wrsiPeriod, setWrsiPeriod, showWrsi, setShowWrsi,
            fetchWrsiData, showRsi, setShowRsi)        
    };

    if (!query) {
        return <div>Error: Símbolo no encontrado en la URL.</div>;
    };

    return (
        <div className="details-page-container">
            <aside className="options-container">
                <h1 className="details-page-title">Detalles de {query}</h1>
                <ChartOptions 
                    handleMainChannelCheck={handleMainChannelCheck}
                    handleSmaCheck={handleSmaCheck}
                    handleEnvelopesCheck={handleEnvelopesCheck}
                    handleBollingerCheck={handleBollingerCheck}
                    handleStochasticCheck={handleStochasticCheck}
                    handleRSICheck={handleRsiCheck}
                    handleWRSICheck={handleWrsiCheck}
                    showSma={showSma}
                    showEnvelopes={showEnvelopes}
                    showBollinger={showBollinger}
                    showStochastic={showStochastic}
                    showRsi={showRsi}
                    showWrsi={showWrsi}
                    setActiveInfo={setActiveInfo}
                    setInfoOpen={setInfoOpen}
                />
            </aside>            

            <main className="chart-main-content">
                <MainChart
                    data={timeSeries}
                    mainChannelData={mainChannel}
                    showMainChannel={showMainChannel}
                    smaData={sma}
                    showSma={showSma}
                    envelopesData={envelopes}
                    showEnvelopes={showEnvelopes}
                    bollingerData={bollinger}
                    showBollinger={showBollinger}
                />

                {(showRsi || showWrsi) && (
                    <div className="indicator-chart-container">
                        <RsiChart
                            rsiData={rsi}
                            wrsiData={wrsi}
                            showRsi={showRsi}
                            showWrsi={showWrsi}
                        />
                    </div>
                )}
            
                {showStochastic && (
                    <div className="indicator-chart-container">
                        <StochasticChart
                            stochasticKData={stochasticK}
                            stochasticDData={stochasticD}
                        />
                    </div>
                )}            
            </main>

            <ChartInfoDrawer
                open={infoOpen}
                activeInfo={activeInfo}
                onClose={() => setInfoOpen(false)}
            />
        </div>
    );
}