import { useState, useEffect } from "react"
import { stockService } from "../services"
import { mapToCandleStick, mapMainChannel, mapSingleValue, mapBands, mapStochasticD, mapStochasticK } from "../models";
import { MainChart, ChartOptions, RsiChart, StochasticChart } from "../components";
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
    const dMin = 1;
    const smaMin = 2;
    const envMin = 5;
    const bollingerMin = 5;
    const kMin = 5;
    const maxPeriod = 100;
    const maxDPeriod = 30;

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
        stockService.sma(symbol, period)
            .then(result => {
                let data = result.data;
                let values = mapSingleValue(data);
                setSma(values);
            })
            .catch(error => {
                setSma([]);
                console.error("Error fetching SMA details:", error);
            });
    };

    const fetchEnvelopesData = (symbol, period, percentage) => {
        stockService.envelopes(symbol, period, percentage)
            .then(result => {
                let data = result.data;
                let values = mapBands(data);
                setEnvelopes(values);
            })
            .catch(error => {
                setEnvelopes([]);
                console.error("Error fetching Envelopes Bands details:", error);
            });
    };

    const fetchBollingerData = (symbol, period, k) => {        
        stockService.bollinger(symbol, period, k)
            .then(result => {
                let data = result.data;
                let values = mapBands(data);
                setBollinger(values);
            })
            .catch(error => {
                setBollinger([]);
                console.error("Error fetching Bollinger Bands details:", error);
            });
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

    const fetchRsiData = (symbol, period) => {
        stockService.rsi(symbol, period)
            .then(result => {
                let data = result.data;
                let values = mapSingleValue(data);
                setRsi(values);
            })
            .catch(error => {
                setRsi([]);
                console.error("Error fetching RSI details:", error);
            });
    };

    const fetchWrsiData = (symbol, period) => {
        stockService.wrsi(symbol, period)
            .then(result => {
                let data = result.data;
                let values = mapSingleValue(data);
                setWrsi(values);
            })
            .catch(error => {
                setWrsi([]);
                console.error("Error fetching WRSI details:", error);
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
        if (!nextShow) {
            setShowEnvelopes(false);
            return;
        }
        if (envelopes.length == 0 || period != envPeriod || percentage != envPercentage) {
            setEnvPeriod(period);
            fetchEnvelopesData(query, period, percentage);
        };
        setShowEnvelopes(true);
    };

    const handleBollingerCheck = (period, k, nextShow) => {
        if (!nextShow){
            setShowBollinger(false);
            return;
        }
        if (bollinger.length == 0 || period != bollingerPeriod || k != bollingerK) {
            setBollingerPeriod(period);
            fetchBollingerData(query, period, k);
        };
        setShowBollinger(true);
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
        if (rsi.length == 0 || (period != rsiPeriod && !showRsi)) {
            setRsiPeriod(period);
            fetchRsiData(query, period);
        };
        setShowRsi(!showRsi);
        if (showWrsi == true) {
            setShowWrsi(false);
        }        
    };

    const handleWrsiCheck = (period) => {
        if (wrsi.length == 0 || (period != wrsiPeriod && !showWrsi)) {
            setWrsiPeriod(period);
            fetchWrsiData(query, period);
        };
        setShowWrsi(!showWrsi);
        if (showRsi == true) {
            setShowRsi(false);
        }        
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
                smaMin={smaMin}                
                envMin={envMin}                
                bollingerMin={bollingerMin}
                kMin={kMin}
                dMin={dMin}
                maxPeriod={maxPeriod}
                maxDPeriod={maxDPeriod}
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

        <aside className="info-panel">
            <div className="info-card">
                <h3>Interpretación</h3>
                <p>Info sobre el indicador seleccionado...</p>
            </div>
        </aside>
    </div>
);
}