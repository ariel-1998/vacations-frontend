import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa"
import "./NotFound.css";

function NotFound(): JSX.Element {

    return (
        <div className="not-found-container card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <FaExclamationCircle className="not-found-icon" />
            <h1 className="not-found-heading">404 - Page Not Found</h1>
            <p className="not-found-text">Sorry, we couldn't find the page you were looking for.</p>
            <button onClick={() => window.history.back()}
                className="not-found-button">Go back</button>
        </div>
    );
}

export default NotFound;
