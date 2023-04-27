import axios from "axios";
import { login, logout } from "../App/authSlice";
import { store } from "../App/store";
import { CredentialsModel } from "../models/CredentialsModel";
import { UserModel } from "../models/UserModel";
import { authApiConfig } from "../utils/apiConfig";

class AuthService {

    async register(user: UserModel): Promise<void> {
        const { data } = await axios.post<string>(authApiConfig.API_REGISTER, user);
        store.dispatch(login(data));
    }

    async login(credentials: CredentialsModel): Promise<void> {
        const { data } = await axios.post<string>(authApiConfig.API_LOGIN, credentials);
        store.dispatch(login(data));
    }

    async logout(): Promise<void> {
        store.dispatch(logout());
    }
}

export const authService = new AuthService()