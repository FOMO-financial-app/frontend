import profileicon from "../../../assets/img/user-icon.svg"
import cancelicon from "../../../assets/img/cancel-icon.svg"
import checkicon from "../../../assets/img/check-icon.svg"
import deleteicon from "../../../assets/img/del-icon.svg"
import editicon from "../../../assets/img/edit-icon.svg"
import { useState } from "react"
import { ConfirmationDrawer, normalizeString, validateString, logger } from "../../../shared/"
import { userEditDTO } from "../models/"
import "./UserCard.css"

export const UserCard = ({ profileAvatar, userName, email, editUser, deleteUser, isLoading }) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editedName, setEditedName ] = useState("");
    const [ drawerOpen, setDrawerOpen ] = useState(false);
    const [ confirmTitle, setConfirmTitle ] = useState("");
    const [ confirmMessage, setConfirmMessage ] = useState("");
    const [ confirmType, setConfirmType ] = useState("");
    const [ nameError, setNameError ] = useState(false);
    const minNameLength = 3;
    const maxNameLength = 50;
    
    if (isLoading) {
        return (
            <div className="user-card">
                <div className="skeleton uc-skeleton-avatar" />
                <div className="user-info">
                    <div className="skeleton uc-skeleton-name" />
                    <div className="skeleton uc-skeleton-email" />
                </div>
            </div>
        );
    }
    
    const handleEdit = () => {
        if (!isEditing) {
            setIsEditing(true);
            setEditedName(userName);
        } else {
            handleConfirmEdit();
        } 
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNameError(false);
    };

    const handleConfirmInternal = async () => {
        try {
            if (confirmType === "edit") {
                await editAction();
            } else if (confirmType === "delete") {
                await deleteAction();
            }
        } catch (error) {
            logger.error("Operation error:", error);
        } finally {
            setIsEditing(false);
            setDrawerOpen(false);
        }
    };

    const handleConfirmEdit = () => {
        setNameError(false);

        const name = normalizeString(editedName);
        if (!validateString(minNameLength, maxNameLength, name)) {
            setNameError(true);
            return;
        };

        setConfirmType("edit");
        setConfirmTitle("¿Desea cambiar su nombre de usuario?");
        setConfirmMessage(`Su nuevo nombre será ${editedName}`);
        setDrawerOpen(true);
    };

    const editAction = async () => {
        const name = normalizeString(editedName);
        if (!validateString(minNameLength, maxNameLength, name)) return;

        const userUpdateDTO = userEditDTO(name);
        await editUser(userUpdateDTO);
    }

    const handleDelete = () => {
        setConfirmType("delete");
        setConfirmTitle("¿Desea eliminar su cuenta?");
        setConfirmMessage("Esta acción es permanente. Perderá todos sus posts y dejará de recibir alertas.");        
        setDrawerOpen(true);
    };

    const deleteAction = async () => {
        await deleteUser();
    }

    return (
        <div className="user-card">
            <img
                src={deleteicon}
                alt="Eliminar"
                className="delete-icon"
                onClick={handleDelete}
            />

            <div className="user-avatar">
                <img src={profileAvatar || profileicon } alt={`Avatar de ${userName}`} />
            </div>

            <div className="user-info">
                <div className="user-name-row">
                    {isEditing ? (
                        <input
                            className="user-name-input"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    ) : (
                        <div className="user-name">{userName}</div>
                    )}
                
                    <img
                        src={isEditing ? checkicon : editicon}
                        alt="Editar"
                        className={`edit-icon ${isEditing ? "check-icon" : ""}`}
                        onClick={handleEdit}
                    />

                    {isEditing && 
                        <img
                            src={cancelicon}
                            alt="Cancelar"
                            className="cancel-icon"
                            onClick={handleCancel}
                        />
                    }
                </div>

                {nameError && (
                    <span className="uc-error-text">
                        El nombre debe contener entre {minNameLength} y {maxNameLength} caracteres.
                    </span>
                )}

                <div className="user-email">{email}</div>

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
    );
}