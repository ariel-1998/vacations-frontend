import { useQuery } from "@tanstack/react-query";
import { VacationModel } from "../models/VacationsModel";
import { vacationsService } from "../services/vacationsService";

export const VACATION_KEYS = {
    VACATIONS: "vacations",
    ADMIN_VACATIONS: "admin",
    LIKED_VACATIONS: "likedVacations",
    FUTURE_VACATIONS: "futureVacations",
    ACTIVE_VACATIONS: "activeVacations",
    SINGLE_VACATION: "vacation"
}

export function useVacations(queryKey: string, pageNum: number) {
    let queryFn: (num: number) => Promise<VacationModel[]>
    switch (queryKey) {

        case VACATION_KEYS.VACATIONS:
            queryFn = vacationsService.getVacations
            break;

        case VACATION_KEYS.ADMIN_VACATIONS:
            queryFn = vacationsService.getVacationsForAdmin
            break;

        case VACATION_KEYS.LIKED_VACATIONS:
            queryFn = vacationsService.getLikedVacations
            break;

        case VACATION_KEYS.FUTURE_VACATIONS:
            queryFn = vacationsService.getFutureVacations
            break;

        case VACATION_KEYS.ACTIVE_VACATIONS:
            queryFn = vacationsService.getActiveVacations
            break;

        default:
            queryFn = vacationsService.getVacations
            break;
    }

    return useQuery<VacationModel[]>(
        ["all" ,queryKey, pageNum],
        () => queryFn(pageNum))
}