import { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import profileicon from "../../../../assets/img/user-icon.svg"
import logouticon from "../../../../assets/img/logout-icon.svg"
import "./UserMenu.css"

const defaultPic =
  "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg";

export const UserMenu = () => {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
        isLoading
    } = useAuth0();

    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const close = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    if (isLoading) return null;

    const handleClick = () => {
        if (!isAuthenticated) {
            loginWithRedirect({
                authorizationParams: {
                    connection: "google-oauth2"
                }
            });
        } else {
            setOpen(!open);
        }
    };

    return (
        <div ref={menuRef} className="user-menu" onClick={handleClick}>
            <img
                src={user?.picture || defaultPic}
                className="user-icon"
                alt="Perfil"
            />

            {open && (
                <div className="user-dropdown">
                    <button className="dropdown-item" onClick={() => navigate("/perfil")}>
                        <img src={profileicon} className="dropdown-icon" alt="" />
                        <span>Perfil</span>
                    </button>
                    
                    <button
                        className="dropdown-item"
                        onClick={() =>
                            logout({ logoutParams: { returnTo: window.location.origin }})
                        }
                    >
                        <img src={logouticon} className="dropdown-icon" alt="" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            )}
        </div>
    )
}