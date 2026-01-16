import { useRef, useEffect } from "react";
import "./ChartInfoDrawer.css";

export const ChartInfoDrawer = ({ open, onClose, activeInfo }) => {
    const drawerRef = useRef(null);
      
    useEffect(() => {
        if (!open) return;
        
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();

                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                };
            };
        };

        const handleClickOutside = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target)) {
                onClose();
            };
        };
        
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onClose]);

    return (
        <div ref={drawerRef} className={`drawer ${open ? "open" : ""}`}>
            <div className="drawer-header">
                <h3>Información</h3>
                <button className="drawer-close" onClick={onClose}>✕</button>
            </div>
            <div className="drawer-content">
                {activeInfo === "mainchannel" && (
                    <>
                        <h4>Canal Madre</h4>
                        <ul>
                            <li>Muestra la tendencia general del precio.</li>
                            <li>Las bandas delimitan el rango esperado del precio.</li>
                        </ul>
                    </>
                )}

                {activeInfo === "sma" && (
                    <>
                        <h4>SMA (Media Móvil Simple)</h4>
                        <ul>
                            <li>Suaviza el precio para definir la tendencia.</li>
                            <li>Precio por encima sugiere tendencia alcista.</li>
                            <li>Precio por debajo sugiere tendencia bajista.</li>
                        </ul>
                    </>
                )}
                
                {activeInfo === "envelopes" && (
                    <>
                        <h4>Bandas Envolventes</h4>
                        <ul>
                            <li>Se calculan aplicando un porcentaje al SMA.</li>
                            <li>El porcentaje se ajusta según la volatilidad (mayor volatilidad = % mayor).</li>
                            <li>Compra cerca de la banda inferior. Venta cerca de la banda superior.</li>
                        </ul>
                    </>
                )}
                
                {activeInfo === "bollinger" && (
                    <>
                        <h4>Bandas de Bollinger</h4>
                        <ul>
                            <li>Se calculan usando desviaciones estándar del SMA.</li>
                            <li>Bandas estrechas (contracción) preceden a movimientos de precio fuertes (expansión).</li>
                            <li>Útiles para identificar posibles puntos de giro.</li>
                        </ul>
                    </>
                )}
                
                {activeInfo === "rsi" && (
                    <>
                        <h4>RSI (Indicador de Fuerza Relativa)</h4>
                        <ul>
                            <li>Sobrecompra (señal venta): RSI mayor a 70.</li>
                            <li>Sobreventa (señal compra): RSI menor a 30.</li>
                            <li>Pierde efectividad en extremos (sobre 80% o bajo 20%).</li>
                            <li>La divergencia con el precio sugiere cambio de tendencia.</li>
                        </ul>
                    </>
                )}
                
                {activeInfo === "wrsi" && (
                    <>
                        <h4>WRSI (RSI de Wilder)</h4>
                        <ul>
                            <li>Es más sensible y volátil (más "ruido") que el RSI.</li>
                            <li>Sobrecompra (señal venta): RSI mayor a 70.</li>
                            <li>Sobreventa (señal compra): RSI menor a 30.</li>
                            <li>Pierde efectividad en extremos (sobre 80% o bajo 20%).</li>
                        </ul>
                    </>
                )}
                
                {activeInfo === "stochastic" && (
                    <>
                        <h4>Oscilador Estocástico (Líneas %K y %D)</h4>
                        <ul>
                            <li>Señal de compra: %K cruza arriba a %D.</li>
                            <li>Señal de venta: %K cruza abajo a %D</li>
                            <li>Pierde efectividad en extremos (sobre 90% o bajo 10%).</li>
                            <li>La divergencia con el precio sugiere cambio de tendencia.</li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};
