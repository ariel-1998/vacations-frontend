import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VACATION_KEYS } from "../../../hooks/useVacationsHook";
import { ACCEPTED_MIME_TYPES, VacationForm, vacationSchema } from "../../../models/VacationsModel";
import { notifyService } from "../../../services/notifyService";
import { vacationsService } from "../../../services/vacationsService";
import "./AddVacation.css";
import { SyntheticEvent, useState } from "react";


function AddVacation(): JSX.Element {

    const queryClient = useQueryClient();
    const [imageChange, setImageChange] = useState('');
    const navigate = useNavigate();

    const { handleSubmit, register, formState: { errors } } = useForm<VacationForm>({
        resolver: zodResolver(vacationSchema.refine(data => {
            if (!data.pic) return false;
            if (!data.pic[0]) return false;
            return ACCEPTED_MIME_TYPES.includes(data.pic[0].type)
        }, {
            message: "Image types: " + ACCEPTED_MIME_TYPES.join(" , ") + " are required",
            path: ["pic"]
        }))
    });

    const mutation = useMutation({
        mutationFn: vacationsService.addVacation,
        onError: (error) => notifyService.error(error),
        onSuccess: () => {
            notifyService.success("successfully added new vacation");
            queryClient.invalidateQueries(["all", VACATION_KEYS.ADMIN_VACATIONS]);
            queryClient.invalidateQueries(["chartLikesReports"]);
            navigate("/vacations")
        }
    });


    const onSubmit = (vacation: VacationForm) => {
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("startDate", vacation.startDate.toString());
        myFormData.append("endDate", vacation.endDate.toString());
        myFormData.append("pic", vacation.pic[0]);
        mutation.mutate(myFormData as VacationForm)
    }

    function imageChanger(e: SyntheticEvent) {
        const files = (e.target as HTMLInputElement).files

        if (files?.length) {
            const filereader = new FileReader()
            filereader.readAsDataURL(files[0]);

            filereader.onload = () => {
                setImageChange(filereader.result as string);
            };
        } else setImageChange('')
    }




    return (
        <div className="AddVacation">

            <Card className="auth-form shadow p-3 mb-5 bg-body rounded">
                <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-center">Add vacation</h2>

                    <Form.Group className="mb-3">
                        <Form.Label>Enter vacation destination:</Form.Label>
                        <Form.Control type="text" placeholder="Enter destination..."
                            {...register("destination")} />
                        {errors.destination && <Form.Text className="text-muted">
                            {errors.destination.message}
                        </Form.Text>}
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>Enter vacation description:</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2" label="description">
                            <Form.Control as="textarea" style={{ height: "200px" }}
                                className="text-area"  {...register("description")} />
                        </FloatingLabel>
                        {errors.description &&
                            <Form.Text className="text-muted">
                                {errors.description.message}
                            </Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Enter vacation price:</Form.Label>
                        <Form.Control type="number" placeholder="Enter price..."
                            {...register("price")} />
                        {errors.price &&
                            <Form.Text className="text-muted">
                                {errors.price.message}
                            </Form.Text>}
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>Enter vacation starting date:</Form.Label>
                        <Form.Control type="date" placeholder="Enter starting date..."
                            {...register("startDate")} />
                        {errors.startDate &&
                            <Form.Text className="text-muted">
                                {errors.startDate.message}
                            </Form.Text>}
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>Enter vacation end date:</Form.Label>
                        <Form.Control type="date" placeholder="Enter end date..."
                            {...register("endDate")} />
                        {errors.endDate &&
                            <Form.Text className="text-muted">
                                {errors.endDate.message}
                            </Form.Text>}
                    </Form.Group>


                    <Form.Group className="mb-3">
                        {imageChange && <Card.Img src={imageChange} />}
                        <Form.Label>Enter vacation photo:</Form.Label>
                        <Form.Control type="file" accept="image/*" 
                        onInput={imageChanger} {...register("pic")} />
                        {errors.pic &&
                            <Form.Text className="text-muted">
                                {errors.pic.message}
                            </Form.Text>}
                    </Form.Group>


                    <div className="d-flex justify-content-center form-btns">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="warning" type="reset">
                            Reset
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default AddVacation;
