import "./EditButton.css";
import { AiFillEdit } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
    path: string
}

function EditButton({ path }: EditButtonProps): JSX.Element {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate(path)} className="like-button icon-button">
                <span className="icon-span edit-span-icon">Edit</span>
                    <AiFillEdit  className="icon edit-icon" color="#bbb" />
            </button>
    );
}

export default EditButton;
