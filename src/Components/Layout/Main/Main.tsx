import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { RootState } from "../../../App/store";
import { VACATION_KEYS } from "../../../hooks/useVacationsHook";
import { Role } from "../../../models/UserModel";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import NotFound from "../../CustomComponents/NotFound/NotFound";
import Home from "../../Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationPage from "../../VacationsArea/VacationPage/VacationPage";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import VacationsReports from "../../VacationsArea/VacationsReports/VacationsReports";
import "./Main.css";

function Main(): JSX.Element {

    const user = useSelector((state: RootState) => state.auth)
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />

                <Route path="/auth">
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                </Route>

                {user &&

                    <Route path="/vacations">
                        <Route path=""
                            element={user.role === Role.User &&
                                <VacationsList queryKey={VACATION_KEYS.VACATIONS} />
                                || user.role === Role.Admin &&
                                <VacationsList queryKey={VACATION_KEYS.ADMIN_VACATIONS} />} />

                        <Route path=":vacationId" element={<VacationPage />} />
                    </Route>

                }



                {user?.role === Role.Admin &&
                    <Route path="/admin">
                        <Route path="add-vacation" element={<AddVacation />} />
                        <Route path="update/:vacationId" element={<EditVacation />} />
                        <Route path="reports" element={<VacationsReports />} />
                        <Route path=":vacationId" element={<VacationPage />} />
                    </Route>
                }
                

                <Route path="/*" element={user ?
                    <NotFound /> : <Navigate to="/auth/login" />} />

                <Route path="try" element={<NotFound />} /> 
            </Routes>
        </div>
    );
}

export default Main;
