class AuthApiConfig {
    API_REGISTER = 'http://localhost:3001/api/auth/register';
    API_LOGIN = 'http://localhost:3001/api/auth/login';
}

class VacationsApiConfig {
    API_VACATIONS = "http://localhost:3001/api/vacations";
    API_ADMIN_VACATIONS = "http://localhost:3001/api/vacations/admin";
    API_LIKED_VACATIONS = "http://localhost:3001/api/vacations/liked";
    API_FUTURE_VACATIONS = "http://localhost:3001/api/vacations/future";
    API_ACTIVE_VACATIONS = "http://localhost:3001/api/vacations/active";
    API_SINGLE_VACATION = "http://localhost:3001/api/vacations/single";
    API_VACATION_IMAGE = "http://localhost:3001/api/vacations/image/"
}

class LikeApiConfig {
    API_LIKES = "http://localhost:3001/api/likes"
}

export const authApiConfig = new AuthApiConfig() 
export const vacationsApiConfig = new VacationsApiConfig()
export const likeAPiConfig = new LikeApiConfig()