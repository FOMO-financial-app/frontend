import "./TradeMethodTags.css"

const METHOD_LABELS = {
    sma: "SMA",
    bollinger: "BOLL",
    stochastic: "STOCH",
    rsi: "RSI",
    other: "OTRO"
};

export const TradeMethodTagsMobile = ({ tradeMethod }) => {
    const activeTags = Object.entries(tradeMethod)
        .filter(([_, enabled]) => enabled)
        .map(([key]) => key);

    if (activeTags.length === 0) return null;

    return (
        <div className="tags-mobile-footer">
            {activeTags.map((key, index) => (
                <span key={key}>
                    <span className={`tag-mobile tag-${key}`}>
                        {METHOD_LABELS[key]}
                    </span>
                    {index < activeTags.length - 1 && (
                        <span className="tag-mobile-separator"> – </span>
                    )}
                </span>
            ))}
        </div>
    );
};