import profileicon from "../../../assets/img/user-icon.svg"
import "./UserCard.css"

export const UserCard = ({ profileAvatar, userName, email }) => {
    return (
        <div className="user-card">
            <div className="user-avatar">
                <img src={profileAvatar || profileicon } alt={`Avatar de ${userName}`} />
            </div>

            <div className="user-info">
                <div className="user-name">{userName}</div>
                <div className="user-email">{email}</div>
            </div>
        </div>
    );
}