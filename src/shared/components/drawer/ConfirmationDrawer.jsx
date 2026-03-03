import { useState, useRef, useEffect } from "react";
import "./ConfirmationDrawer.css";

export const ConfirmationDrawer = ({ open, onClose, title, message, handleConfirm, type }) => {
    const [isLoading, setIsLoading] = useState(false);
    const drawerRef = useRef(null);
    
    const onConfirmClick = async () => {
        setIsLoading(true);
        try {
            await handleConfirm();
        } catch (error) {
            console.error("Error en la confirmación:", error);
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        if (!open) {
            setIsLoading(false);
            return;
        }
        
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
        <div className={`drawer-overlay ${open ? "open" : ""}`}>
            <div ref={drawerRef} className="confirmation-drawer">
                <div className="confirmation-header">
                    <h3>{title}</h3>
                </div>

                <div className="confirmation-body">
                    <p>{message}</p>
                </div>
                
                <div className="confirmation-footer">
                    <button 
                        className="btn cancel-btn"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button 
                        className={`btn confirm-btn ${type === "delete" ? "danger" : "success"}`}
                        onClick={onConfirmClick}
                        disabled={isLoading}
                    >
                        {isLoading ? "Procesando..." : (type === "delete" ? "Eliminar" : "Confirmar")}
                    </button>
                </div>
            </div>
        </div>
    );
};