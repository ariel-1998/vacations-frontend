import dayjs from "dayjs";

class DateFormatterService {

    dateFormating(date: Date) {
        let newDate = new Date(date).toISOString().split("T")[0];
         newDate = dayjs(newDate).add(1, 'day').format('YYYY-MM-DD');
         return newDate.split("-").join(".")
    }

    defaultDateValue(date: Date) {
        let newDate = new Date(date).toISOString().split("T")[0];
        newDate = dayjs(newDate).add(1, 'day').format('YYYY-MM-DD');

        return newDate
    }
}

export const dateFormatterService = new DateFormatterService()