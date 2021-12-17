// Http service
import { Http } from "../services";

// Export business api
export class BusinessApi {
    static deposit(value: number) {
        return Http.post("/business/deposit", { value });
    }

    static reset() {
        return Http.post("/business/reset");
    }
}