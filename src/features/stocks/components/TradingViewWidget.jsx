import { useEffect, useRef, memo } from 'react';

const CONTAINER_CLASS = "my-tradingview-ticker-container"; 

function TradingViewWidget() {
    const container = useRef(null);

    useEffect(() => {
        const config = {
            "symbols": [
                {
                "proName": "NASDAQ:TSLA",
                "title": "TSLA"
                },
                {
                "proName": "NASDAQ:NVDA",
                "title": "NVDA"
                },
                {
                "proName": "NASDAQ:AVGO",
                "title": "AVGO"
                },
                {
                "proName": "NYSE:ORCL",
                "title": "ORCL"
                },
                {
                "proName": "NASDAQ:AAPL",
                "title": "AAPL"
                },
                {
                "proName": "NASDAQ:PLTR",
                "title": "PLTR"
                },
                {
                "proName": "NASDAQ:META",
                "title": "META"
                },
                {
                "proName": "NASDAQ:AMD",
                "title": "AMD"
                },
                {
                "proName": "NASDAQ:MSFT",
                "title": "MSFT"
                },
                {
                "proName": "NASDAQ:AMZN",
                "title": "AMZN"
                },
                {
                "proName": "NASDAQ:MU",
                "title": "MU"
                },
                {
                "proName": "NASDAQ:GOOG",
                "title": "GOOG"
                },
                {
                "proName": "NASDAQ:LULU",
                "title": "LULU"
                },
                {
                "proName": "OANDA:XAUUSD",
                "title": "XAUUSD"
                },
                {
                "proName": "COINBASE:BTCUSD",
                "title": "BTCUSD"
                }
            ],
            "colorTheme": "light",
            "locale": "en",
            "largeChartUrl": "",
            "isTransparent": true,
            "showSymbolLogo": true,
            "displayMode": "adaptive"
        };
        
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify(config);
        
        if (container.current) {
            container.current.innerHTML = ''; 
            container.current.appendChild(script);
        }

        return () => {
            if (container.current && container.current.contains(script)) {
                container.current.removeChild(script);
            }
        };

    }, []);

    return (
        <div className={CONTAINER_CLASS} ref={container}>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/markets/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Ticker tape</span>
                </a>
                <span className="trademark"> by TradingView</span>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);