import { useState } from "react";
import { isoToDateInput, deleteSpaces, validateDateResult, StockSearcher, ConfirmationDrawer } from "../../";
import { resultEditDTO } from "../../../features/profile/";
import deleteicon from "../../../assets/img/del-icon.svg"
import "./ResultEdit.css"

export const ResultEdit = ({ item, onClose, editResult, deleteResult }) => {
    const [ newSymbol, setNewSymbol ] = useState(item.symbol);
    const [ numberOfStocks, setNumberOfStocks ] = useState(item.numberOfStocks);
    const [ entryDate, setEntryDate ] = useState(isoToDateInput(item.entryDate));
    const [ entryPrice, setEntryPrice ] = useState(item.entryPrice);
    const [ exitDate, setExitDate ] = useState(isoToDateInput(item.exitDate));
    const [ exitPrice, setExitPrice ] = useState(item.exitPrice);
    const [ tradeMethod, setTradeMethod ] = useState(item.tradeMethod);
    const [ drawerOpen, setDrawerOpen ] = useState(false);
    const [ confirmTitle, setConfirmTitle ] = useState("");
    const [ confirmMessage, setConfirmMessage ] = useState("");
    const [ confirmType, setConfirmType ] = useState("");
    const [ dateError, setDateError ] = useState(false);
    const [ priceError, setPriceError ] = useState(false);
    const [ stockError, setStockError ] = useState(false);

    const {
        id,
        symbol
    } = item;

    const tagsConfig = [
        { key: "sma", label: "SMA", tag: "sma" },
        { key: "bollinger", label: "Bollinger", tag: "bollinger" },        
        { key: "stochastic", label: "Estocástico", tag: "stochastic" },
        { key: "rsi", label: "RSI", tag: "rsi" },
        { key: "other", label: "Otro", tag: "other" }
    ];

    const handleToggleTag = (key) => {
        setTradeMethod(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    }; 

    const handleConfirmInternal = async () => {
        try {
            if (confirmType === "edit") {
                await editAction();
            } else if (confirmType === "delete") {
                await deleteAction();
            }
        } catch (error) {
            console.error("Confirmation error:", error);
        } finally {
            setDrawerOpen(false);
            onClose();
        }
    };
    
    const handleConfirmEdit = () => {
        setPriceError(false);
        setStockError(false);
        setDateError(false);
        let hasError = false;

        if (entryPrice <= 0 || exitPrice <= 0) {
            setPriceError(true);
            hasError = true;
        }

        if (numberOfStocks <= 0) {
            setStockError(true);
            hasError = true;
        } 
            
        if(!validateDateResult(entryDate, exitDate)) {
            setDateError(true);
            hasError = true;
        }

        if (hasError == true) {
            return;
        }

        setConfirmType("edit");
        setConfirmTitle("¿Desea modificar su post?");
        setConfirmMessage("En caso de error, siempre podrá modificar sus posts.");
        setDrawerOpen(true);
    };
    
    const editAction = async () => {
        if (id < 0 || entryPrice <= 0 || exitPrice <= 0 || numberOfStocks <= 0) return;

        const symbolInput = deleteSpaces(newSymbol);
        if (!symbolInput || symbolInput.length === 0) {
            return;
        }
            
        if(!validateDateResult(entryDate, exitDate)) {
            return;
        }            
        const isoEntryDate = entryDate + "T00:00:00.000Z";
        const isoExitDate = exitDate + "T00:00:00.000Z";

        const resultUpdateDTO = resultEditDTO(id, newSymbol, entryPrice, exitPrice, numberOfStocks,
            isoEntryDate, isoExitDate, tradeMethod);
        await editResult(resultUpdateDTO);        
    }
    
    const handleDelete = () => {
        setConfirmType("delete");
        setConfirmTitle("¿Desea eliminar su post?");
        setConfirmMessage("Esta acción es permanente. Su post dejará de existir.");        
        setDrawerOpen(true);
    };
    
    const deleteAction = async () => {
        await deleteResult(id);
    }

    return (
        <div className="drawer-overlay open">
            <div className="re-drawer">
                <div className="re-card">
                    <div className="re-header">
                        <div className="re-header-top">
                            <div className="re-trade-dates">
                                <div className="re-date-section">
                                    <div className="re-title">COMPRA</div>

                                    <div className="re-date-block">
                                        <input
                                            className="re-input re-date-input"
                                            type="date"
                                            value={entryDate}
                                            onChange={(e) => setEntryDate(e.target.value)}
                                        />
                                        <div className="re-input-money-wrapper">
                                            <input
                                                className="re-input re-price-input"
                                                type="number"
                                                step="0.01"
                                                value={entryPrice}
                                                onChange={(e) => setEntryPrice(e.target.value)}
                                            />
                                        </div>                                    
                                    </div>
                                </div>
                                
                                <div className="re-date-section">
                                    <div className="re-title">VENTA</div>

                                    <div className="re-date-block">
                                        <input
                                            className="re-input re-date-input"                                        
                                            type="date"
                                            value={exitDate}
                                            onChange={(e) => setExitDate(e.target.value)}
                                        />
                                        <div className="re-input-money-wrapper">
                                            <input
                                                className="re-input re-price-input"
                                                type="number"
                                                step="0.01"
                                                value={exitPrice}
                                                onChange={(e) => setExitPrice(e.target.value)}
                                            />
                                        </div>                                    
                                    </div>
                                </div>
                            </div>
                            <img
                                src={deleteicon}
                                alt="Eliminar"
                                className="re-delete-icon"
                                onClick={handleDelete}
                            />
                        </div>
                        
                        {dateError && (
                            <span className="re-error-text">
                                Las fechas deben ser posteriores al año 2025, y no pueden superar la fecha actual.
                            </span>
                        )}
                        {dateError && (
                            <span className="re-error-text">
                                La fecha de compra debe ser anterior o igual a la fecha de venta.
                            </span>
                        )}
                        {priceError && (
                            <span className="re-error-text">
                                Ambos precios deben ser mayores a 0.
                            </span>
                        )}
                    </div>
                        
                    <div className="re-body">
                        <div className="re-column">
                            <div className="re-title">SÍMBOLO</div>

                            <div className="re-searcher-wrapper">
                                <StockSearcher
                                    initialValue={symbol}
                                    onSelect={setNewSymbol}
                                />
                            </div>                               
                        </div>
                            
                        <div className="re-column">
                            <div className="re-title">VOLUMEN</div>
                               
                            <input
                                className="re-input re-volume-input"
                                type="number"
                                step="1"
                                value={numberOfStocks}
                                onChange={(e) => setNumberOfStocks(e.target.value)}
                            />

                            {stockError && (
                                <span className="re-error-text">
                                    El volumne de acciones debe ser mayor a 0.
                                </span>
                            )}
                        </div>
                            
                        <div className="re-column">
                            <div className="re-title">INDICADORES</div>
                            <div className="re-tags-container">
                                {tagsConfig.map(tag => (
                                    <label key={tag.key} className="re-tag-item">
                                        <input
                                            type="checkbox"
                                            checked={!!tradeMethod[tag.key]}
                                            onChange={() => handleToggleTag(tag.key)}
                                        />
                                        <span className={`tag tag-${tag.tag}`}>
                                            {tag.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="re-footer">
                        <button 
                            className="re-btn re-cancel"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button 
                            className="re-btn re-confirm"
                            onClick={handleConfirmEdit}
                        >
                            Confirmar
                        </button>
                    </div>

                    <ConfirmationDrawer
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        title={confirmTitle}
                        message={confirmMessage}
                        handleConfirm={handleConfirmInternal}
                        type={confirmType}
                    />
                </div>
            </div>
        </div>            
        
    );
};