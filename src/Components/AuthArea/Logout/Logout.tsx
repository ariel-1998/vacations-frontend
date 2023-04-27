import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/authServic";
import { notifyService } from "../../../services/notifyService";
import "./Logout.css";

function Logout(): JSX.Element | null {

    const navigate = useNavigate();

    useEffect(() => {

        authService.logout();

        notifyService.info('We hope to see you again');

        navigate("/auth/login");

    }, []);

    return null;
}

export default Logout;
