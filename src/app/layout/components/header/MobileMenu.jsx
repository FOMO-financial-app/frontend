import { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import hamburgericon from "../../../../assets/img/hamburger-icon.svg"
import stockicon from "../../../../assets/img/stock-icon.svg"
import profileicon from "../../../../assets/img/user-icon.svg"
import logouticon from "../../../../assets/img/logout-icon.svg"
import "./MobileMenu.css"

export const MobileMenu = () => {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
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
        setOpen(!open);        
    };

    const handleProfileClick = () => {
        if (!isAuthenticated) {
            loginWithRedirect({
                authorizationParams: {
                    connection: "google-oauth2"
                }
            });
        } else {
            navigate("/perfil");
        }
    };

    return (
        <div ref={menuRef} className="mobile-menu" onClick={handleClick}>
            <img
                src={hamburgericon}
                className="menu-icon"
                alt="Menu"
            />

            {open && (
                <div className="menu-dropdown">
                    <button className="dropdown-item" onClick={handleProfileClick}>
                        <img src={profileicon} className="dropdown-icon" alt="" />
                        <span>Perfil</span>
                    </button>

                    <button className="dropdown-item" onClick={() => navigate("/resultados")}>
                        <img src={stockicon} className="dropdown-icon" alt="" />
                        <span>Resultados</span>
                    </button>
                    
                    {isAuthenticated && (
                        <button
                            className="dropdown-item"
                            onClick={() =>
                                logout({ logoutParams: { returnTo: window.location.origin }})
                            }
                        >
                            <img src={logouticon} className="dropdown-icon" alt="" />
                            <span>Cerrar sesión</span>
                        </button>
                    )}                    
                </div>
            )}
        </div>
    )
}