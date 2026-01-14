import { StockSearcher } from "../../../../shared"
import { Link } from 'react-router-dom'
import fomoicon from "../../../../assets/img/fomo-icon.svg"
import rocketicon from "../../../../assets/img/rocket-icon.svg"
import "./Header.css"

export const Header = () => {
    return (
        <header>
            <nav>
                <Link to={'/'} className="logo">
                    <img src={fomoicon} className="fomo-icon" alt="Fomo"/>
                    <img src={rocketicon} className="logo-icon" alt="Logo"/>
                </Link>
                <div className="nav">
                    <StockSearcher searchPath="stock-details"></StockSearcher>
                    <Link to={'/Resultados'}>Resultados</Link>
                </div>
                <Link to={'/Perfil'} className="user-profile">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" className="user-icon" alt="Perfil"/>
                </Link>
            </nav>
        </header>
    )
}