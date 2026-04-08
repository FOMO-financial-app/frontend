import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import herobackground from "../../assets/img/hero-background.avif"
import chartindicators from "../../assets/img/screenshots/chart-indicators.avif"
import emailalert from "../../assets/img/screenshots/email-alert.avif"
import homepage from "../../assets/img/screenshots/homepage.avif"
import socialboard from "../../assets/img/screenshots/social-board.avif"
import mobilechart from "../../assets/img/screenshots/mobile-chart.avif"
import mobilealert from "../../assets/img/screenshots/mobile-alert.avif"
import mobilehomepage from "../../assets/img/screenshots/mobile-homepage.avif"
import mobileboard from "../../assets/img/screenshots/mobile-board.avif"
import fomologo from "../../assets/img/fomo-icon.svg"
import fomoicon from "../../assets/img/rocket-icon.svg"
import { useWindowWidth } from "../../shared";
import "./Landing.css";

const slides = [
    {
        title: "Descubrí acciones",
        text: "Buscá empresas del NASDAQ y NYSE de forma simple.",
        img: homepage,
    },
    {
        title: "Indicadores sin código",
        text: "Aplicá indicadores técnicos con un click, sin necesidad de scripts.",
        img: chartindicators,
    },
    {
        title: "Alertas inteligentes",
        text: "Recibí notificaciones cuando el mercado presenta oportunidades.",
        img: emailalert,
    },
    {
        title: "Compartí resultados",
        text: "Compartí tus análisis y descubrimientos con otros usuarios.",
        img: socialboard,
    },
];

const mobileslides = [
    {
        img: mobilehomepage,
    },
    {
        img: mobilechart,
    },
    {
        img: mobilealert,
    },
    {
        img: mobileboard,
    },
];

export const Landing = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const width = useWindowWidth();
    const isMobile = width < 768;

    const next = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % slides.length);
    };
    
    const prev = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 7000);
        return () => clearInterval(timer);
    }, [index]);

    return (
        <div className="landing">

        <section className="hero">

            <div className="hero__background">
                <img src={herobackground} className="hero__bg-img" />
                <div className="hero__bg-overlay" />
            </div>  

            <div className="hero__logo">
                <img src={fomologo} className="hero__logo-img" />
                <img src={fomoicon} className="hero__icon-img" />
            </div>

            <div className="hero__content">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero__title"
                >
                    No te quedes afuera
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hero__subtitle"
                >
                    Detectá oportunidades antes que el mercado
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="hero__description"
                >
                    Analizá acciones de forma simple, rápida y sin complicaciones
                </motion.p>

                <Link to={'/home'}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="hero__cta"
                    >
                        Empezar ahora
                    </motion.button>
                </Link>          
            </div>

            <a href="#carousel" className="hero__scroll-indicator">↓</a>
        </section>

        <section className="carousel" id="carousel">
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[index].title}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="carousel__text"
                >
                    <h2 className="carousel__slide-title">{slides[index].title}</h2>
                    <p className="carousel__slide-text">{slides[index].text}</p>
                </motion.div>
            </AnimatePresence>

            {!isMobile &&
                <div className="carousel__image-row">

                    <button onClick={prev} className="carousel__btn">←</button>

                    <div className="carousel__image-wrap">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.img
                                key={slides[index].img}
                                src={slides[index].img}
                                alt="feature"
                                className="carousel__image"
                                custom={direction}
                                variants={{
                                    enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
                                    center:           { opacity: 1, x: 0 },
                                    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: "easeInOut" }}
                            />
                        </AnimatePresence>
                    </div>

                    <button onClick={next} className="carousel__btn">→</button>
                </div>
            }
            
            {isMobile &&
                <div className="carousel__image-row">

                    <button onClick={prev} className="carousel__btn">←</button>

                    <div className="carousel__image-wrap">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.img
                                key={mobileslides[index].img}
                                src={mobileslides[index].img}
                                alt="feature"
                                className="carousel__image-mobile"
                                custom={direction}
                                variants={{
                                    enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
                                    center:           { opacity: 1, x: 0 },
                                    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: "easeInOut" }}
                            />
                        </AnimatePresence>
                    </div>

                    <button onClick={next} className="carousel__btn">→</button>
                </div>
            }

            <div className="carousel__dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`carousel__dot ${i === index ? "carousel__dot--active" : ""}`}
                    />
                ))}
            </div>

            <Link to={'/home'} onClick={() => window.scrollTo(0, 0)}>
                <button className="carousel__cta">Empezar ahora</button>
            </Link>            
        </section>
        </div>
    );
};