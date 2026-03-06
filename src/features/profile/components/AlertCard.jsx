import cancelicon from "../../../assets/img/cancel-icon.svg"
import checkicon from "../../../assets/img/check-icon.svg"
import editicon from "../../../assets/img/edit-icon.svg"
import { useState } from "react"
import { ConfirmationDrawer } from "../../../shared/"
import { userEditDTO } from "../models/"
import "./AlertCard.css"

export const AlertCard = ({ alerts, onCheck, editUser, isLoading }) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ drawerOpen, setDrawerOpen ] = useState(false);
    const [ confirmTitle, setConfirmTitle ] = useState("");
    const [ confirmMessage, setConfirmMessage ] = useState("");
    const [ confirmType, setConfirmType ] = useState("");

    const alertConfig = [
        { key: "smaAlert", label: "SMA", tag: "sma" },
        { key: "rsiAlert", label: "RSI", tag: "rsi" },
        { key: "bollingerAlert", label: "Bollinger", tag: "bollinger" },
        { key: "stochasticAlert", label: "Estocástico", tag: "stochastic" }
    ];

    if (isLoading) {
        return (
            <div className="alert-card">
                <div className="skeleton ac-skeleton-title" />
                <div className="alert-grid">
                    <div className="skeleton ac-skeleton-tag" />
                    <div className="skeleton ac-skeleton-tag" />
                    <div className="skeleton ac-skeleton-tag" />
                    <div className="skeleton ac-skeleton-tag" />
                </div>
            </div>
        );
    }
    
    const handleEdit = () => {
        if (!isEditing) {
            setIsEditing(true);
        } else {
            handleConfirmEdit();
        }; 
    };
    
    const handleCancel = () => {
        setIsEditing(false);
    };
    
    const handleConfirmInternal = async () => {
        try {
            await editAction();
        } catch (error) {
            console.error("Error en la operación:", error);
        } finally {
            setIsEditing(false);
            setDrawerOpen(false);
        };
    };
    
    const handleConfirmEdit = () => {
        setConfirmType("edit");
        setConfirmTitle("¿Desea actualizar sus alertas?");
        setConfirmMessage("Recibirá una notificación cuando un usuario encuentre un resultado positivo");
        setDrawerOpen(true);
    };
    
    const editAction = async () => {
        const name = ""
        if (alerts == null) return;    
        const userUpdateDTO = userEditDTO(name, alerts.smaAlert, alerts.bollingerAlert, alerts.stochasticAlert, alerts.rsiAlert);
        await editUser(userUpdateDTO);
    }

    return (
        <div className="alert-card">
            <img
                src={isEditing ? checkicon : editicon}
                alt="Editar"
                className={`alert-edit-icon ${isEditing ? "alert-check-icon" : ""}`}
                onClick={handleEdit}
            />
                    
            {isEditing && 
                <img
                    src={cancelicon}
                    alt="Cancelar"
                    className="alert-cancel-icon"
                    onClick={handleCancel}
                />
            }

            <div className="alert-card-title">Alertas</div>
                        
            <div className="alert-grid">
                {alertConfig.map(alert => (
                    <label key={alert.key} className="alert-item">
                        <input
                        type="checkbox"
                        checked={!!alerts[alert.key]}
                        onChange={() => onCheck(alert.key)}
                        disabled={!isEditing}
                        />
                        <span className={`tag tag-${alert.tag}`}>
                            {alert.label}
                        </span>
                    </label>
                ))}
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
    );
}