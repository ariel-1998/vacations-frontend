import axios from "axios"
import { VacationForm, VacationModel } from "../models/VacationsModel";
import { vacationsApiConfig } from "../utils/apiConfig"

class VacationsService {

    async getVacations(pageNumber: number): Promise<VacationModel[]> {
        const { data } = await axios.get(vacationsApiConfig.API_VACATIONS + `/${pageNumber}`);
        return data;
    }

    async getVacationsForAdmin(pageNumber: number): Promise<VacationModel[]> {
        const { data } = await axios.get(
            vacationsApiConfig.API_ADMIN_VACATIONS + `/${pageNumber}`
            );
        return data;
    }

    async getLikedVacations(pageNumber: number) {
        const { data } = await axios.get(vacationsApiConfig.API_LIKED_VACATIONS + `/${pageNumber}`);
        return data;
    }

    async getFutureVacations(pageNumber: number) {
        const { data } = await axios.get(vacationsApiConfig.API_FUTURE_VACATIONS + `/${pageNumber}`);
        return data;
    }

    async getActiveVacations(pageNumber: number) {
        const { data } = await axios.get(vacationsApiConfig.API_ACTIVE_VACATIONS + `/${pageNumber}`);
        return data;
    }

    async getSingleVacation(vacationId: number): Promise<VacationModel> {
        const { data } = await axios.get(vacationsApiConfig.API_SINGLE_VACATION + "/" + vacationId)
        return data
    }

    async addVacation(vacation: VacationForm): Promise<VacationModel> {
        const { data } = await axios.post(vacationsApiConfig.API_VACATIONS, vacation);
        return data;
    }

    async updateVacation(vacation: VacationForm) {
        const { data } = await axios.put(
            vacationsApiConfig.API_VACATIONS + "/" + vacation.get("vacationId"), vacation
            );
        return data
    }

    async deleteVacation(vacationId: number) {
        const { data } = await axios.delete(vacationsApiConfig.API_VACATIONS + "/" + vacationId);
        return data
    }

}

export const vacationsService = new VacationsService();