export const mapAlerts = ((data) => {
    if (!data) return [];
    
    const indicatorsAlerts = [
        { key: "sma", label: "SMA", enabled: data.smaAlert },
        { key: "rsi", label: "RSI", enabled: data.rsiAlert },
        { key: "bollinger", label: "Bollinger", enabled: data.bollingerAlert },
        { key: "stochastic", label: "Estocástico", enabled: data.stochasticAlert }        
    ];

    return indicatorsAlerts;
})