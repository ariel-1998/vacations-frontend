import { toast } from "react-toastify";

class NotifyService {
    error(e: any) {
        toast.error(this.extractErrorMessage(e));
    }

    info(msg: string) {
        toast.info(msg);
    }

    success(msg: string) {
        toast.success(msg);
    }

    private extractErrorMessage(e: any) {
        if (e?.response?.data) {
            if (Array.isArray(e.response.data)) { 
                return e.response.data;
            }
            return e.response.data; 
        }
        if (e?.message) { 
            return e.message;
        }
    }
}

export const notifyService = new NotifyService();