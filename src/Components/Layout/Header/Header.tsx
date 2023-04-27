import { useSelector } from "react-redux";
import { RootState } from "../../../App/store";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {

    const user = useSelector((state: RootState) => state.auth)
    
    return (
        <div className="Header">
            <AuthMenu />
            <h1 className="header-title">
                Hello {user ? user.firstName + ' ' + user.lastName: "guest"}
                </h1>
        </div>
    );
}

export default Header;
