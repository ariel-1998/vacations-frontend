import { object, z } from "zod";



function getYesterdayDate() {
    const yesterdayDate = new Date(new Date(Date.now()).getTime() - 24 * 60 * 60 * 1000);
    return yesterdayDate;
}

export const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

export const vacationSchema = z.object({
    vacationId: z.number().optional(),

    destination: z.string()
        .min(2, 'Destination name must contain at least 2 letters')
        .max(20, 'Destination letters must be 20 letters or less'),

    description: z.string().min(20, 'Description name must contain at least 20 letters')
        .max(400, 'Description name must be under least 400 letters'),

    startDate: z.preprocess((arg) => {

        if (typeof arg === "string" || arg instanceof Date) return new Date(arg)
    }, z.date().min(getYesterdayDate(), "Must be grater or equal to today")),

    endDate: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) return new Date(arg)
    }, z.date().min(getYesterdayDate(), "Must be grater or equal to today")),


    price: z.string()
        .refine((val) => !isNaN(parseInt(val)), 'Price must be a number')
        .refine((val) => +val < 10000 && +val > 0, "Price range is 1 - 10,000"),

        pic: z.instanceof(FileList), 

    likes: z.number().optional(),
    isLiked: z.boolean().optional(),
    totalVacations: z.number().optional()
})
    .refine(data => data.startDate <= data.endDate,
        {
            message: "Start date must be equal or greater than end date",
            path: ["startDate"]
        })


export type VacationModel = z.infer<typeof vacationSchema>


export interface VacationForm extends FormData {
    vacationId?: number
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    pic: FileList
}
