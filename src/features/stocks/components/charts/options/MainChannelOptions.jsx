export const MainChannelOptions = ({setActiveInfo, setInfoOpen, icon, showMainChannel, handleMainChannelToggle}) => {
    return (
        <div className="option-container">
            <div className="option-header">
                <span className="option-title">
                    Canal Madre
                    <span className="color-dot" style={{ backgroundColor: '#131722'}}/>
                        <button
                            className="info-btn"
                            onClick={() => {
                            setActiveInfo("mainchannel");
                            setInfoOpen(true);
                            }}
                        >
                            <img
                                src={icon}
                                alt="Info"
                                className="info-icon"
                            />
                        </button>
                </span>                    
                <label className="switch">
                    <input type="checkbox" checked={showMainChannel}
                        onChange={(e) => handleMainChannelToggle(e.target.checked)}/>
                    <span className="slider-round"/>
                </label>  
            </div>
        </div>          
    );
};