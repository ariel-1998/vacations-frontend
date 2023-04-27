import { ReactNode, SyntheticEvent } from "react";
import { FcNext, FcPrevious } from "react-icons/fc"

import "./NextAndPrevIcon.css";

export enum PaginationAction {
    Next = "Next", Prev = "Prev"
}

interface NextAndPrevIconProps {
    buttonAction: PaginationAction;
    currentPage: number;
    totalVacations: number;
}


function NextAndPrevIcon({ currentPage, totalVacations, buttonAction }: NextAndPrevIconProps): JSX.Element {


    return (
        <div className={"page" &&
            buttonAction === PaginationAction.Prev && 
            currentPage === 1 && "current-page" ||

            buttonAction === PaginationAction.Next &&
            currentPage === Math.ceil(totalVacations / 10) &&
            "current-page" || "page"
            }>

            {buttonAction === PaginationAction.Prev  && 
            <FcPrevious size={25} /> ||
            <FcNext size={25} />}
        </div>
    );
}

export default NextAndPrevIcon;
