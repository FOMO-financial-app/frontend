import './App.css'
import { useAuthApi } from './shared/'
import { SyncUser } from "./app/SyncUser.jsx"
import { RoutesHandler } from './app/routes';

function App() {
    const authApiReady = useAuthApi();
    return (
        <>
            {authApiReady && <SyncUser />}
            <RoutesHandler/>
        </>
    );
};

export default App
