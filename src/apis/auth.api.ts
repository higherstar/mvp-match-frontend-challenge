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

    static me(token: string) {
        return Http.post("/auth/me", { token });
    }
}
