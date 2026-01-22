import { Route, Routes } from 'react-router-dom'
import { HomePage, BoardPage, UserProfilePage, StockDetailsPage } from '../../features'
import { InvalidRoutePage } from '../../shared'
import { MainLayout } from '../layout/MainLayout.jsx'
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const RoutesHandler = () => {
    const ProtectedProfile = withAuthenticationRequired(UserProfilePage);

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='*' element={<InvalidRoutePage />}></Route>
                <Route path='/resultados' element={<BoardPage />}></Route>
                <Route path='/perfil' element={<ProtectedProfile />}></Route>
                <Route path='/stock-details/:query' element={<StockDetailsPage />}></Route>
            </Route>
        </Routes>
    )
}