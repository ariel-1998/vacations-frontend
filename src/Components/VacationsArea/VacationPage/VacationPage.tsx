import { useQuery } from "@tanstack/react-query";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../App/store";
import { VACATION_KEYS } from "../../../hooks/useVacationsHook";
import { Role } from "../../../models/UserModel";
import { dateFormatterService } from "../../../services/dateFormatterService";
import { notifyService } from "../../../services/notifyService";
import { vacationsService } from "../../../services/vacationsService";
import { vacationsApiConfig } from "../../../utils/apiConfig";
import EditButton from "../../CustomComponents/EditButton/EditButton";
import LikeButton from "../../CustomComponents/LikeButton/LikeButton";
import ModalDeleteButton from "../../CustomComponents/ModalDeleteButton/ModalDeleteButton";
import image from "../../../assets/no-image.png"
import "./VacationPage.css";
import { SyntheticEvent } from "react";
import NotFound from "../../CustomComponents/NotFound/NotFound";

function VacationPage(): JSX.Element {

    const { vacationId } = useParams();
    const user = useSelector((state: RootState) => state.auth);

    const { data: vacation, isError } = useQuery(
        ["all", VACATION_KEYS.SINGLE_VACATION, vacationId],
        () => vacationsService.getSingleVacation(+vacationId!), {

        onError: (err) => notifyService.error(err),
    });


    return (
        <>

            {isError && <NotFound />}


            {vacation && user &&
                <Card className="VacationPage-card">
                    <div className="VacationPage">
                        <img className="vacation-img" onError={(e: SyntheticEvent) => {
                            (e.target as HTMLImageElement).src = image
                        }}
                            src={vacationsApiConfig.API_VACATION_IMAGE + vacation.pic} />

                        <div className="vacation-btns-wrapper">
                            {user.role === Role.User ?
                                <>
                                    <Button className="vacation-btn btn-secondary">${vacation.price}</Button>

                                    <LikeButton isLiked={vacation.isLiked!}
                                        likesAmount={vacation.likes!}
                                        vacationId={vacation.vacationId!} />
                                </>
                                :
                                <div className="vacation-page-admin-btns">
                                    <ModalDeleteButton vacation={vacation} />
                                    <EditButton path={`vacations/update/${vacation.vacationId}`} />
                                </div>}
                        </div>

                        <div className="vacation-page-body text-center">
                            <h2>{vacation.destination}</h2>

                            <div className="vacation-page-date">
                                &#x1F4C5;
                                {dateFormatterService.dateFormating(vacation.startDate)} -
                                {dateFormatterService.dateFormating(vacation.endDate)}
                            </div>
                        </div>
                        <p className="vacation-description">{vacation.description}</p>
                    </div>
                </Card>}

        </>
    );
}

export default VacationPage;
