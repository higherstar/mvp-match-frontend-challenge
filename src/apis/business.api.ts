// Http service
import { Http } from "../services";

// Interfaces
import { IProductInCart } from "../interfaces";

// Export business api
export class BusinessApi {
    static deposit(value: number) {
        return Http.post("/business/deposit", { value });
    }

    static reset() {
        return Http.post("/business/reset");
    }

    static purchase(products: IProductInCart[]) {
        return Http.post("/business/purchase", { products });
    }
}