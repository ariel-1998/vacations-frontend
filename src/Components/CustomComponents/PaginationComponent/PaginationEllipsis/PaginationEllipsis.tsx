import { SyntheticEvent } from "react";
import "./PaginationEllipsis.css";

interface PaginationEllipsisProps {
    onClick: (e: SyntheticEvent) => void 
}

function PaginationEllipsis({ onClick }: PaginationEllipsisProps): JSX.Element {
    return (
        <div onClick={onClick} className="PaginationEllipsis">
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>
    );
}

export default PaginationEllipsis;

