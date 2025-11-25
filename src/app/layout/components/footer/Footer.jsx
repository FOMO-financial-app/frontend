import "./Footer.css"

export const Footer = () => {
    return (
        <footer>
            <div className="disclaimer">
                <img src="src/assets/img/warning-icon.svg" className="logo-icon" alt="Advertencia"/>
                <p>
                    Los indicadores NO SON GARANTÍA de éxito.
                    <br />
                    Las inversiones a corto plazo conllevan el máximo riesgo 
                    <br />
                    y los precios de las acciones pueden variar rápidamente.
                    <br />
                    El único y exclusivo propósito de este sitio es académico.
                </p>
            </div>
            
            <div className="atributions">
                <p><a href="https://www.flaticon.es/iconos-gratis/error" title="error iconos">Error iconos creados por Gregor Cresnar - Flaticon</a></p>
                <p><a href="https://www.flaticon.es/iconos-gratis/astronave" title="astronave iconos">Astronave iconos creados por Freepik - Flaticon</a></p>
                <p><a href="https://www.flaticon.com/free-icons/linkedin" title="linkedin icons">Linkedin icons created by riajulislam - Flaticon</a></p>
                <p><a href="https://www.flaticon.com/free-icons/github" title="github icons">Github icons created by riajulislam - Flaticon</a></p>
            </div>

            <div className="networks">
                <h3>Redes</h3> 
                
                <div className="network-items-container">
                    <div className="network-item">
                        <img src="src/assets/img/linkedin-icon.svg" className="logo-icon" alt="LinkedIn"/>
                        <a href="">Linkedin</a>
                    </div>

                    <div className="network-item">
                        <img src="src/assets/img/github-icon.svg" className="logo-icon" alt="Github"/>
                        <a href="">Github</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}