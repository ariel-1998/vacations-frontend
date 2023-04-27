import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { likeService } from "../../../services/likeServices";
import DownloadCSVButton from "../../CustomComponents/DownloadCSVButton/DownloadCSVButton";
import NotFound from "../../CustomComponents/NotFound/NotFound";
import PaginationComponent from "../../CustomComponents/PaginationComponent/PaginationComponent";
import ReoprtsChart from "../../CustomComponents/ReoprtsChart/ReoprtsChart";
import "./VacationsReports.css";


function VacationsReports(): JSX.Element {

    const [currentPage, setCurrentPage] = useState(1);

    const { data: likes, isError } = useQuery(
        ["chartLikesReports", currentPage],
        () => likeService.getVacationLikesByPage(currentPage))

    return (
        <div className="VacationsReports">

            {isError && <NotFound />}

            {likes && likes[0] &&

                <>
                    <div className="VacationsReports">
                        <h3 className="text-center">Vacations likes reports</h3>
                        <DownloadCSVButton />
                        <ReoprtsChart chartData={likes} />

                        <PaginationComponent
                            totalVacations={likes[0].totalVacations!}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage} />
                    </div>
                </>

            }


        </div>
    );
}

export default VacationsReports;
