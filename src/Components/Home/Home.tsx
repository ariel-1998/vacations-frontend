import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../App/store";
import layoutImg from "../../assets/layout.jpg"
import { notifyService } from "../../services/notifyService";
import "./Home.css";


function Home(): JSX.Element {

  const user = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()
  const onClick = () => {
    if(user?.role){
      navigate("/vacations");
      return;
    }

    navigate("/auth/login");
    notifyService.info("You are not logged in")
  }

  return (
    <div className="Home">
      <button className="vacation-button" onClick={onClick}>
        Book Your Vacation
      </button>
    </div>

  )

}

export default Home;
