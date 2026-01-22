import { StockSearcher } from "../../../../shared"
import { Link } from 'react-router-dom'
import fomoicon from "../../../../assets/img/fomo-icon.svg"
import rocketicon from "../../../../assets/img/rocket-icon.svg"
import "./Header.css"
import { UserMenu } from "./UserMenu"

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
                    <Link to={'/resultados'}>Resultados</Link>
                </div>
                <UserMenu/>
            </nav>
        </header>
    )
}