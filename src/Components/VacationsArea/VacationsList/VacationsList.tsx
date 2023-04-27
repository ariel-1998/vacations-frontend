import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../App/store";
import { useVacations, VACATION_KEYS } from "../../../hooks/useVacationsHook";
import { Role } from "../../../models/UserModel";
import EmptyPage from "../../CustomComponents/EmptyPage/EmptyPage";
import PaginationComponent from "../../CustomComponents/PaginationComponent/PaginationComponent";
import Vacation from "./Vacation/Vacation";
import "./VacationsList.css";


interface VacationsListProps {
    queryKey: string;
}

function VacationsList({ queryKey }: VacationsListProps): JSX.Element {

    const [currentPage, setCurrentPage] = useState(1);

    const [filter, setFilter] = useState(queryKey);

    const user = useSelector((state: RootState) => state.auth);

    const { data: vacations } = useVacations(filter, currentPage);

    return (
        <>
            <div className="vacation-list-wrapper">

                {vacations &&
                    <div>

                        {user?.role === Role.User &&
                            <div className="select-filter">
                                <Form.Select onChange={(e: SyntheticEvent) => {
                                    setFilter((e.target as HTMLSelectElement).value)
                                }}>
                                    <option value={VACATION_KEYS.VACATIONS}>No filter</option>
                                    <option value={VACATION_KEYS.LIKED_VACATIONS}>Follows</option>
                                    <option value={VACATION_KEYS.FUTURE_VACATIONS}>Not started</option>
                                    <option value={VACATION_KEYS.ACTIVE_VACATIONS}>Active</option>
                                </Form.Select>
                            </div>
                        }

                        {vacations[0] &&
                            <>
                                <div className="VacationsList">
                                    {vacations &&
                                        vacations.map(vacation => (
                                            <Vacation key={vacation.vacationId}
                                                vacation={vacation} />
                                        ))}
                                </div>

                                <div>
                                    <PaginationComponent
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                        totalVacations={vacations[0] ? vacations[0].totalVacations! : 1} />
                                </div></>}



                        {vacations && !vacations[0] && <EmptyPage />}

                    </div>
                }

            </div>
        </>

    );
}

export default VacationsList;



