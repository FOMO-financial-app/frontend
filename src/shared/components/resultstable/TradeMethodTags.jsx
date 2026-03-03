import "./TradeMethodTags.css"

const METHOD_LABELS = {
    sma: "SMA",
    bollinger: "BOLL",
    stochastic: "STOCH",
    rsi: "RSI",
    other: "OTRO"
};

export const TradeMethodTags = ({ tradeMethod }) => {
    return (
        <div className="tags">
            {Object.entries(tradeMethod)
                .filter(([_, enabled]) => enabled)
                .map(([key]) => (
                    <span key={key} className={`tag tag-${key}`}>
                        {METHOD_LABELS[key]}
                    </span>
                ))
            }
        </div>
    );
};