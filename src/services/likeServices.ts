import axios from "axios"
import { VacationLikeReport } from "../models/VacationLikeReport";
import { likeAPiConfig } from "../utils/apiConfig"

class LikeServices {

    async getVacationLikesReports(): Promise<VacationLikeReport[]> {
        const { data } = await axios.get(likeAPiConfig.API_LIKES);
        return data
    }

    async getVacationLikesByPage(pageNum: number): Promise<VacationLikeReport[]> {
        const { data } = await axios.get(likeAPiConfig.API_LIKES + "/" + pageNum);
        return data
    }

    async addLikeToVacation(vacationId: number): Promise<void> {
        await axios.post(likeAPiConfig.API_LIKES, {vacationId})
    }

    async removeLikeFromVacation(vacationId: number): Promise<void> {
        await axios.delete(likeAPiConfig.API_LIKES+ "/" + vacationId)
    }
    
}

export const likeService = new LikeServices()