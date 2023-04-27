import { AiOutlineInbox } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./EmptyPage.css";

function EmptyPage(): JSX.Element {
    const navigate = useNavigate()
    return (
        <div className="empty-div">
                  <AiOutlineInbox size={80} />
        <p>Oops! Looks like this page is currently empty.</p>
        <p>Don't worry though, you can add some content by clicking the "Add" button below.</p>
        <button className="empty-button" onClick={() => navigate("/vacations")}>Go to vacations</button>
      </div>
    );
}

export default EmptyPage;
