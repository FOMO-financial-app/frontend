import { Route, Routes } from 'react-router-dom'
import { HomePage, BoardPage, UserProfilePage, StockDetailsWrapper } from '../../features'
import { InvalidRoutePage } from '../../shared'
import { MainLayout } from '../layout/'
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Landing } from '../landing/Landing.jsx';

export const RoutesHandler = () => {
    const ProtectedProfile = withAuthenticationRequired(UserProfilePage);

    return (
        <Routes>
            <Route path='/' element={<Landing />}></Route>
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