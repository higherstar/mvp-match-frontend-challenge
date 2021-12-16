// Http service
import { Http } from "../services";

// Interfaces
import { ILoginData, IRegisterData } from "../interfaces";

// Export auth api
export class AuthApi {
    static login(loginData: ILoginData) {
        return Http.post("/auth/login", loginData);
    }

    static register(registerData: IRegisterData) {
        return Http.post("/auth/register", registerData);
    }

    static me() {
        return Http.get("/auth/me");
    }

    static updateProfile(updateProfileData: ILoginData) {
        return Http.post("/auth/update-profile", updateProfileData);
    }
}
