import { SyntheticEvent } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../App/store";
import { Role } from "../../../../models/UserModel";
import { VacationModel } from "../../../../models/VacationsModel";
import { dateFormatterService } from "../../../../services/dateFormatterService";
import { vacationsApiConfig } from "../../../../utils/apiConfig";
import EditButton from "../../../CustomComponents/EditButton/EditButton";
import LikeButton from "../../../CustomComponents/LikeButton/LikeButton";
import ModalDeleteButton from "../../../CustomComponents/ModalDeleteButton/ModalDeleteButton";
import image from "../../../../assets/no-image.png"
import "./Vacation.css";

interface VacationProps {
  vacation: VacationModel;
}

function Vacation({ vacation }: VacationProps): JSX.Element {

  const user = useSelector((state: RootState) => state.auth)

  const dateFormating = dateFormatterService.dateFormating


  const onImageError = (e: SyntheticEvent) => {
    (e.target as HTMLImageElement).src = image
  }

  return (

    <div>
      <Card className="vacation">
        <div className="img-div">
          <Card.Img className="image" variant="top" 
          onError={onImageError} 
          src={vacationsApiConfig.API_VACATION_IMAGE + vacation.pic} />
          <div className="fader"></div>

          {user?.role === Role.Admin &&
            <div className="admin-top-icons">
              <ModalDeleteButton vacation={vacation} />
              <EditButton path={`/admin/update/${vacation.vacationId}`}/>
            </div>
            ||
            user?.role === Role.User &&
            <LikeButton isLiked={vacation.isLiked!} likesAmount={vacation.likes!}
              vacationId={vacation.vacationId!} className="user-top-icon" />}

          <h3 className="img-float">{vacation.destination}</h3>

          <div className="date-background">
            &#x1F4C5; {dateFormating(vacation.startDate)} - {dateFormating(vacation.endDate)}
          </div>
        </div>

        <div className="description-wrapper">
          <Card.Body className="card-description">
            <p>{vacation.description}</p>
          </Card.Body>
        </div>

        <Card.Body>
        <Link to={`/vacations/${vacation.vacationId}`} >
          <Button variant="secondary" className="card-btn">${vacation.price}</Button>
          </Link>
        </Card.Body>

      </Card>
    </div>
  );
}

export default Vacation;
