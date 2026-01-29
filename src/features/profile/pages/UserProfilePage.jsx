import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./UserProfilePage.css"
import { UserCard, AlertCard } from "../components/";
import { ResultsList, PaginationControls } from "../../../shared";

export const UserProfilePage = () => {
    const [ list, setList ] = useState([]);  
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1); 
    const [ alerts, setAlerts ] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return null;
    if (!isAuthenticated || !user) return null;

    const userData = {
        avatarUrl: user.picture,
        userName: user.name || user.nickname,
        email: user.email
    };

    useEffect (() => {
        let indicatorsAlerts = [
            { key: "sma", label: "SMA", enabled: true },
            { key: "rsi", label: "RSI", enabled: false },
            { key: "bollinger", label: "Bollinger", enabled: false },
            { key: "stochastic", label: "Estocástico", enabled: true }        
        ]

        setAlerts(indicatorsAlerts);
    }, []);
    
    useEffect (() => {
        let results = [{
            symbol: "AA",
            entryPrice: "11",
            exitPrice: "11,5",
            profit: "0,5",
            numberOfStocks: "3",
            entryDate: "11/01/2026",
            exitDate: "27/01/2026",
            tradeMethod: {
                "sma": true,
                "bollinger": false,
                "stochastic": false,
                "rsi": false,
                "other": false
            },
            userName: "Alejandro"
        },
        {
            symbol: "BB",
            entryPrice: "15",
            exitPrice: "10",
            profit: "-5",
            numberOfStocks: "7",
            entryDate: "25/01/2026",
            exitDate: "24/01/2026",
            tradeMethod: {
                "sma": true,
                "bollinger": true,
                "stochastic": true,
                "rsi": false,
                "other": true
            },
            userName: "Alejandro"
        }]

        setList(results)
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="profile-page-container">
            <div className="profile-header">
                <UserCard
                    profileAvatar={userData.avatarUrl}
                    userName={userData.userName}
                    email={userData.email}
                />
                
                <AlertCard
                    alerts={alerts}
                />
            </div>
            
            <div className="profile-results">
                <ResultsList list={list} />
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}