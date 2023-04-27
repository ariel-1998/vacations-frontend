import Pagination, { PaginationProps } from "rc-pagination";
import { SyntheticEvent } from "react";
import PaginationEllipsis from "./PaginationEllipsis/PaginationEllipsis";
import NextAndPrevIcon, { PaginationAction } from "./PaginationIcons/NextAndPrevIcon/NextAndPrevIcon";
import "./PaginationComponent.css";

interface PaginationComponentProps {
    setCurrentPage: (number: number) => void;
    currentPage: number;
    totalVacations: number;
}

type PaginationItemProps = PaginationProps['itemRender'];

function PaginationComponent({ setCurrentPage, currentPage, totalVacations }: PaginationComponentProps): JSX.Element {

    function handlePageChange(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    const renderPaginationItem: PaginationItemProps = (current, type, element) => {
        if (type === 'page') {
            if (current === currentPage) {

                return (
                    <div className="current-page">
                        {current}
                    </div>
                )
            }
            return (
                <div className="page">
                    {current}
                </div>
            );
        }
        return element;
    };

    const ellipsisElement = (e: SyntheticEvent) => {
        e.stopPropagation();
    }

    return (
        <Pagination
            current={currentPage}
            total={totalVacations}
            onChange={handlePageChange}

            nextIcon={
                <NextAndPrevIcon currentPage={currentPage}
                    buttonAction={PaginationAction.Next}
                    totalVacations={totalVacations} />
            }

            prevIcon={
                <NextAndPrevIcon currentPage={currentPage}
                    buttonAction={PaginationAction.Prev}
                    totalVacations={totalVacations} />
            }
            
            className="pagination"
            itemRender={renderPaginationItem}
            jumpNextIcon={<PaginationEllipsis onClick={ellipsisElement} />}
            jumpPrevIcon={<PaginationEllipsis onClick={ellipsisElement} />}
            showTitle={false}
        />
    );
}

export default PaginationComponent;
