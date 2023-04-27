import { FaTrash } from "react-icons/fa";
import "./DeleteButton.css";

interface DeleteButtonProps {
    onClick: () => void
}

function DeleteButton({ onClick }: DeleteButtonProps): JSX.Element {
    return (
            <button onClick={onClick} className="like-button icon-button">
                <span className="icon-span">Delete</span>
                    <FaTrash className="icon" color="#bbb" />
            </button>
    );
}

export default DeleteButton;
