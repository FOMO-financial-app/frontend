import { useRef, useEffect, useState } from "react";
import { ChartOptions } from "./ChartOptions";
import optionsicon from "../../../../assets/img/options-icon.svg"
import "./ChartOptionsDrawer.css";

export const ChartOptionsDrawer = ({handleMainChannelCheck, handleSmaCheck, handleEnvelopesCheck, handleBollingerCheck, handleStochasticCheck,
    handleRsiCheck, handleWrsiCheck, showSma, showEnvelopes, showBollinger, showStochastic, showRsi, showWrsi, setActiveInfo, setInfoOpen
}) => {
    const [ open, setOpen ] = useState(false);
    const drawerRef = useRef(null);
      
    useEffect(() => {
        if (!open) return;
        
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);

                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                };
            };
        };

        const handleClickOutside = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target)) {
                setOpen(false);
            };
        };
        
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="cod-wrapper">
            <div className="cod-toolbar">
                <button className="cod-open-btn" onClick={() => setOpen(true)}>
                    <img
                        src={optionsicon}
                        className="cod-open-icon"
                    />
                    Opciones
                </button>
            </div>

            {open && (
                <div className="cod-overlay">
                    <div ref={drawerRef} className="cod-drawer">
                        <button className="cod-close-btn" onClick={() => setOpen(false)}>✕</button>
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
                    </div>
                </div>
            )}
        </div>
    );
};