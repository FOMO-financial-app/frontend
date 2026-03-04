import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"
import "./MainLayout.css"


export const MainLayout = () => {
    return (
        <div className="app-layout">
            <Header />
            <main className="app-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}