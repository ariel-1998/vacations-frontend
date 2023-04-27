import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../App/store";
import { Role } from "../../../models/UserModel";
import { notifyService } from "../../../services/notifyService";
import "./Navbar.css";

function Navbar(): JSX.Element {
    const user = useSelector((state: RootState) => state.auth)
    
    return (
        <div className="Navbar">
            <NavLink to="/home">Home</NavLink>

            <NavLink onClick={() => {
                if(!user) {
                    notifyService.info("You are not logged in")
                }
            }}
             to={ !user ? "/auth/login" : "/vacations"}>Vacations</NavLink>
            
            {user?.role === Role.Admin &&
            <>
            <NavLink to="admin/add-vacation">Add vacation</NavLink>
            <NavLink to="admin/reports">Reports</NavLink>
            </>}
        </div>
    );
}

export default Navbar;
