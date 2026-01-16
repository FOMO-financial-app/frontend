import warningicon from "../../../../assets/img/warning-icon.svg"
import linkedincon from "../../../../assets/img/linkedin-icon.svg"
import githubicon from "../../../../assets/img/github-icon.svg"
import "./Footer.css"

export const Footer = () => {
    return (
        <footer>
            <div className="disclaimer">
                <img src={warningicon} className="logo-icon" alt="Advertencia"/>
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
                <p>
                    <a 
                        href="https://www.flaticon.es/iconos-gratis/error" 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="error iconos"
                    >
                        Error iconos creados por Gregor Cresnar - Flaticon
                    </a>
                </p>
                <p>
                    <a 
                        href="https://www.flaticon.es/iconos-gratis/astronave"
                        target="_blank"
                        rel="noopener noreferrer" 
                        title="astronave iconos"
                    >
                        Astronave iconos creados por Freepik - Flaticon
                    </a>
                </p>
                <p>
                    <a 
                        href="https://www.flaticon.com/free-icons/linkedin"
                        target="_blank"
                        rel="noopener noreferrer" 
                        title="linkedin icons"
                    >
                        Linkedin icons created by riajulislam - Flaticon
                    </a>
                </p>
                <p>
                    <a 
                        href="https://www.flaticon.com/free-icons/github"
                        target="_blank"
                        rel="noopener noreferrer" 
                        title="github icons"
                    >
                        Github icons created by riajulislam - Flaticon
                    </a>
                </p>
            </div>

            <div className="networks">
                <h3>Redes</h3> 
                
                <div className="network-items-container">
                    <div className="network-item">
                        <img src={linkedincon} className="logo-icon" alt="LinkedIn"/>
                        <a 
                            href="https://www.linkedin.com/in/alejandro-goro-aa64522a7/"
                            target="_blank"
                            rel="noopener noreferrer" 
                        >
                            Linkedin
                        </a>
                    </div>

                    <div className="network-item">
                        <img src={githubicon} className="logo-icon" alt="Github"/>
                        <a 
                            href="https://github.com/GoroAlejandro"
                            target="_blank"
                            rel="noopener noreferrer" 
                        >
                            Github
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}