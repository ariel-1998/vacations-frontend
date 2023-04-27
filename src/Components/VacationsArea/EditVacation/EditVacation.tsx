import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SyntheticEvent, useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ParseParams } from "zod";
import { VACATION_KEYS } from "../../../hooks/useVacationsHook";
import { VacationForm, VacationModel, vacationSchema } from "../../../models/VacationsModel";
import { dateFormatterService } from "../../../services/dateFormatterService";
import { notifyService } from "../../../services/notifyService";
import { vacationsService } from "../../../services/vacationsService";
import { vacationsApiConfig } from "../../../utils/apiConfig";
import NotFound  from "../../CustomComponents/NotFound/NotFound"
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const { vacationId } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [imageChange, setImageChange] = useState<string>();


    const { data: vacation, isError } = useQuery(
        ["all", VACATION_KEYS.SINGLE_VACATION, vacationId],
        () => vacationsService.getSingleVacation(+vacationId!), {
        onError: (err) => notifyService.error(err),
        onSuccess: (data) => {
            setImageChange(vacationsApiConfig.API_VACATION_IMAGE + data.pic.toString())
        }
    });

    const { handleSubmit, register, formState: { errors } } = useForm<VacationModel>({
        resolver: zodResolver(vacationSchema, vacation as Partial<ParseParams>)
    });

    const mutation = useMutation({
        mutationFn: vacationsService.updateVacation,
        onError: (err) => notifyService.error(err),
        onSuccess: () => {
            notifyService.success(`Successfully updated ${vacation?.destination} vacation`)

            queryClient.invalidateQueries(["all", VACATION_KEYS.SINGLE_VACATION, vacationId],
                { exact: true });
            queryClient.invalidateQueries(["all", VACATION_KEYS.ADMIN_VACATIONS])
            navigate("/vacations");
        }
    });

    function onSubmit(data: VacationModel) {
        const myFormData = new FormData();
        myFormData.append("destination", data.destination);
        myFormData.append("description", data.description);
        myFormData.append("price", data.price);
        myFormData.append("startDate", data.startDate.toString());
        myFormData.append("endDate", data.endDate.toString());
        myFormData.append("pic", data.pic[0]);
        if (vacation?.vacationId) myFormData.append("vacationId", vacation?.vacationId!.toString());
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
        } else setImageChange(vacationsApiConfig.API_VACATION_IMAGE + vacation?.pic.toString())
    }

    return (
        <div className="EditVacation">
            {isError && <NotFound />}

            {vacation &&

                <Card className="auth-form shadow p-3 mb-5 bg-body rounded">
                    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-center">Edit vacation</h2>

                        <Form.Group className="mb-3">
                            <Form.Label>Enter vacation destination:</Form.Label>
                            <Form.Control type="text" placeholder="Enter destination..."
                                defaultValue={vacation.destination} {...register("destination")} />
                            {errors.destination && <Form.Text className="text-muted">
                                {errors.destination.message}
                            </Form.Text>}
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Enter vacation description:</Form.Label>
                            <FloatingLabel controlId="floatingTextarea2" label="description">
                                <Form.Control as="textarea" style={{ height: "200px" }}
                                    defaultValue={vacation.description} className="text-area"  {...register("description")} />
                            </FloatingLabel>
                            {errors.description &&
                                <Form.Text className="text-muted">
                                    {errors.description.message}
                                </Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Enter vacation price:</Form.Label>
                            <Form.Control type="number" placeholder="Enter price..."
                                defaultValue={vacation.price} {...register("price")} />
                            {errors.price &&
                                <Form.Text className="text-muted">
                                    {errors.price.message}
                                </Form.Text>}
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Enter vacation starting date:</Form.Label>
                            <Form.Control type="date" placeholder="Enter starting date..."
                                defaultValue={dateFormatterService.defaultDateValue(vacation.startDate)}
                                {...register("startDate")} />
                            {errors.startDate &&
                                <Form.Text className="text-muted">
                                    {errors.startDate.message}
                                </Form.Text>}
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Enter vacation end date:</Form.Label>
                            <Form.Control type="date" placeholder="Enter end date..."
                                defaultValue={dateFormatterService.defaultDateValue(vacation.endDate)}
                                {...register("endDate")} />
                            {errors.endDate &&
                                <Form.Text className="text-muted">
                                    {errors.endDate.message}
                                </Form.Text>}
                        </Form.Group>


                        <Form.Group className="mb-3">
                        <Card.Img src={imageChange} />
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
                </Card>}
        </div>
    );
}

export default EditVacation;
