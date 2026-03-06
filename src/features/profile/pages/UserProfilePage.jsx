import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserCard, AlertCard } from "../components/";
import { userService } from "../services";
import { resultService } from "../../board/services"
import { ResultsList, PaginationControls, mapTradeResults } from "../../../shared";
import "./UserProfilePage.css"

export const UserProfilePage = () => {    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);    
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [ userDbName, setUserDbName ] = useState(null);
    const [ alerts, setAlerts ] = useState({
        smaAlert: false,
        rsiAlert: false,
        bollingerAlert: false,
        stochasticAlert: false
    });
    const [ resultsList, setResultsList ] = useState([]);
    const [ resultsLoading, setResultsLoading ] = useState(false);
    const [ userDataLoading, setUserDataLoading ] = useState(false); 
    const totalItems = 10;

    const {
        logout
    } = useAuth0();

    if (isLoading) return null;
    if (!isAuthenticated || !user) return null;    

    const fetchUserData = () => {
        setUserDataLoading(true);
        userService.details()
            .then(result => {
                const data = result.data;
                setUserDbName(data.name);
                const indicatorsAlerts = {
                    smaAlert: data.smaAlert,
                    rsiAlert: data.rsiAlert,
                    bollingerAlert: data.bollingerAlert,
                    stochasticAlert: data.stochasticAlert
                };
                setAlerts(indicatorsAlerts);
            })
            .catch(error => {
                setUserDbName(null);
                setAlerts(null);
                console.error("Error fetching user details:", error);
            })
            .finally(() => {
                setUserDataLoading(false);
            })
    };

    const fetchResultPage = (page) => {
        setResultsLoading(true);
        userService.page(page, totalItems)
            .then(result => {
                let tradeResults = result.data.data.map(mapTradeResults)
                setResultsList(tradeResults)
                setTotalPages(result.data.totalPages)
            })
            .catch(error => {
                setResultsList([]);
                console.error("Error fetching results:", error)
            })
            .finally(() => {
                setResultsLoading(false);
            })
    };

    useEffect (() => {
        fetchUserData();
    }, []);

    useEffect (() => {
        fetchResultPage(currentPage);
    }, [currentPage]);  

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleEditUser = async (dto) => {
        await userService.edit(dto);
        fetchUserData();
        if (currentPage == 1) {
            fetchResultPage(currentPage);
        } else {
            setCurrentPage(1);
        };
    };

    const handleDeleteUser = async () => {
        await userService.delete();
        logout({ logoutParams: { returnTo: window.location.origin }});
    };

    const handleToggleAlert = (key) => {
        setAlerts(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleEditResult = async (dto) => {
        await resultService.edit(dto);
        if (currentPage == 1) {
            fetchResultPage(currentPage);
        } else {
            setCurrentPage(1);
        };
    };

    const handleDeleteResult = async (id) => {
        await resultService.delete(id);
        if (currentPage == 1) {
            fetchResultPage(currentPage);
        } else {
            setCurrentPage(1);
        };
    };
    
    if (!userDataLoading && !userDbName) {
        return <div className="no-data">
            <span className="no-data-icon">⛔</span>
            <p className="no-data-text">No se puede acceder a los datos del usuario.</p>
            <p className="no-data-text">Por favor intente nuevamente más tarde.</p>
        </div>; 
    };

    return (
        <div className="profile-page-container">
            <div className="profile-header">
                {userDbName && (
                    <UserCard
                        profileAvatar={user.picture}
                        userName={userDbName}
                        email={user.email}
                        editUser={handleEditUser}
                        deleteUser={handleDeleteUser}
                        isLoading={userDataLoading}
                    />
                )}
                
                <AlertCard
                    alerts={alerts}
                    onCheck={handleToggleAlert}
                    editUser={handleEditUser}
                    isLoading={userDataLoading}
                />
            </div>
            
            <div className="profile-results">
                <ResultsList 
                    list={resultsList}
                    editable={true}
                    onEdit={handleEditResult}
                    onDelete={handleDeleteResult}
                    isLoading={resultsLoading}
                    pageSize={totalItems}
                />
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}