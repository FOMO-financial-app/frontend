import { Route, Routes, Navigate } from 'react-router-dom'
import { HomePage, BoardPage, UserProfilePage, StockDetailsWrapper } from '../../features'
import { InvalidRoutePage } from '../../shared'
import { MainLayout } from '../layout/'
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Landing } from '../landing/Landing.jsx';
import { useAuth0 } from "@auth0/auth0-react";

export const RoutesHandler = () => {
    const ProtectedProfile = withAuthenticationRequired(UserProfilePage);

    const {
        isAuthenticated,
    } = useAuth0();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isAuthenticated ? <Navigate to="/home" /> : <Landing/>
                }
            />
            <Route element={<MainLayout />}>                
                <Route path='/home' element={<HomePage />}></Route>
                <Route path='*' element={<InvalidRoutePage />}></Route>
                <Route path='/resultados' element={<BoardPage />}></Route>
                <Route path='/perfil' element={<ProtectedProfile />}></Route>
                <Route path='/stock-details' element={<StockDetailsWrapper />}></Route>
            </Route>
        </Routes>
    )
}