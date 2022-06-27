import {useAuth} from "./useAuth";
import {useNavigate} from "react-router-dom";

export const AuthStatus = () => {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user.name}!{" "}
            <button
                onClick={() => {
                    auth.logout().then(() => {
                        navigate("/")
                    });
                }}
            >
                Logout
            </button>
        </p>
    );
}


