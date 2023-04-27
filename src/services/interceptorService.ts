import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { notifyService } from "./notifyService";

class InterceptorService {
    createInterceptors() {
        axios.interceptors.request.use((req) => {
            const token = localStorage.getItem('token');
            if (token) {
                req.headers = {
                    'Authorization': `Bearer ${token}`
                } as unknown as AxiosRequestHeaders
            }
            return req;
        });

        axios.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: AxiosError) => {
                if (error.response?.status === 401 && error?.response?.data === "You are not logged in") {
                    localStorage.removeItem("token");
                    notifyService.info("You are not logged in")
                    setTimeout(() => window.location.reload(), 1000)
                }
                return Promise.reject(error);
            }
        )
    }

}

export const interceptorService = new InterceptorService();