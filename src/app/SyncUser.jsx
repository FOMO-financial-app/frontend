import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { userService } from "../features/profile/";

export const SyncUser = () => {
    const {
        isAuthenticated,
        isLoading,
        user
    } = useAuth0();
    
    useEffect(() => {
        if (isLoading || !isAuthenticated || !user) return;

        userService.create({
            Name: user.name || user.nickname,
            Email: user.email
        });
    }, [isAuthenticated, isLoading, user]);
};
