import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../App/store";
import "./AuthMenu.css";


function AuthMenu(): JSX.Element {
    const user = useSelector((state: RootState) => state.auth)
    return (
        <div className="AuthMenu">
            {!user ?
                <>
                    <Link to="/auth/login">Login</Link>
                    <span> | </span>
                    <Link to="/auth/register">Register</Link>
                </>
                :
                <Link to="/auth/logout">Logout</Link>}
        </div>
    );
}

export default AuthMenu;
