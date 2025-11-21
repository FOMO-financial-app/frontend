import { StockSearcher } from "../../../../shared/components"
import "./Header.css"
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <header>
            <nav>
                <Link to={'/'} className="logo">
                    <img src="src/assets/img/fomo-icon.svg" className="fomo-icon" alt="Fomo"/>
                    <img src="src/assets/img/rocket-icon.svg" className="logo-icon" alt="Logo"/>
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