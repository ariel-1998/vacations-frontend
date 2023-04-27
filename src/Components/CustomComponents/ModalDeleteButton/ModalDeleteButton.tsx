import { notifyService } from "../../../services/notifyService";
import { vacationsService } from "../../../services/vacationsService";
import DeleteButton from "../DeleteButton/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import "./ModalDeleteButton.css";
import { VacationModel } from "../../../models/VacationsModel";
import { VACATION_KEYS } from "../../../hooks/useVacationsHook";
import { useNavigate } from "react-router-dom";

interface ModalDeleteButtonProps {
    vacation: VacationModel;
}

function ModalDeleteButton({ vacation }: ModalDeleteButtonProps): JSX.Element {
   
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: vacationsService.deleteVacation,
        onSuccess:() => {
            notifyService.success(`successfuly deleted ${vacation.destination} vacation`)
            queryClient.invalidateQueries(["all", VACATION_KEYS.ADMIN_VACATIONS]);
            queryClient.invalidateQueries(["chartLikesReports"]);
            navigate("/vacations")
            
        }
      })
   
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onDelete = () => {
        mutation.mutate(vacation.vacationId!)
      }
   
    return (
        <>
            <DeleteButton onClick={handleShow}/>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {vacation.destination} vacation?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        onDelete()
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}





export default ModalDeleteButton;
