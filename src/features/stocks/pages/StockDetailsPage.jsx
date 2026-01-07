import { useState, useEffect } from "react"
import { stockService, validatePeriod } from "../services"
import { mapToCandleStick, mapMainChannel, mapSingleValue, mapBands } from "../models";
import { MainChart, ChartOptions } from "../components";
import { useParams } from "react-router-dom";
import "./StocksDetailsPage.css"

export const StockDetailsPage = () => {
    const { query } = useParams();
    const [ timeSeries, setTimeSeries ] = useState([]);
    const [ mainChannel, setMainChannel] = useState([]);
    const [ sma, setSma ] = useState([]);
    const [ envelopes, setEnvelopes ] = useState([]);
    const [ bollinger, setBollinger ] = useState([]);
    const [ showMainChannel, setShowMainChannel ] = useState(false);
    const [ showSma, setShowSma ] = useState(false);
    const [ showEnvelopes, setShowEnvelopes ] = useState(false);
    const [ showBollinger, setShowBollinger ] = useState(false);
    const [ smaPeriod, setSmaPeriod ] = useState(20);    
    const [ envPeriod, setEnvPeriod ] = useState(20);    
    const [ bollingerPeriod, setBollingerPeriod ] = useState(20);    
    const [ kPeriod, setKPeriod ] = useState(20);    
    const [ dPeriod, setDPeriod ] = useState(3);    
    const dMin = 1;
    const smaMin = 2;
    const envMin = 5;
    const bollingerMin = 5;
    const kMin = 5;

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
                console.error("Error fetching stock details:", error);
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
                console.error("Error fetching stock details:", error);
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
                console.error("Error fetching stock details:", error);
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

    const handleSmaCheck = (period) => {
        if (!validatePeriod(smaMin, period)){
            setShowSma(prev => !prev);
            return;
        }
        if (sma.length == 0 || (period != smaPeriod && !showSma)) {
            setSmaPeriod(period);
            fetchSmaData(query, period);
        };
        setShowSma(prev => !prev);
    };

    const handleEnvelopesCheck = (period, percentage) => {
        if (!validatePeriod(envMin, period)){
            setShowEnvelopes(prev => !prev);
            return;
        }
        if (envelopes.length == 0 || (period != envPeriod && !showEnvelopes)) {
            setEnvPeriod(period);
            fetchEnvelopesData(query, period, percentage);
        };
        setShowEnvelopes(prev => !prev);
    };

    const handleBollingerCheck = (period, k) => {
        if (!validatePeriod(bollingerMin, period)){
            setShowBollinger(prev => !prev);
            return;
        }
        if (bollinger.length == 0 || (period != bollingerPeriod && !showBollinger)) {
            setBollingerPeriod(period);
            fetchBollingerData(query, period, k);
        };
        setShowBollinger(prev => !prev);
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
                handleStochasticCheck={handleBollingerCheck}
                handleRSICheck={handleSmaCheck}
                handleSRSICheck={handleSmaCheck}
                showSma={showSma}
                smaMin={smaMin}
                showEnvelopes={showEnvelopes}
                envMin={envMin}
                showBollinger={showBollinger}
                bollingerMin={bollingerMin}
                showStochastic={showBollinger}
                kMin={kMin}
                dMin={dMin}
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