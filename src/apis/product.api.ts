// Http service
import { Http } from "../services";

// Interfaces
import { IProduct, IQueryParams } from "../interfaces";

// Export product api
export class ProductApi {
    static create(product: IProduct) {
        return Http.post("/products", product);
    }

    static read(productId: number) {
        return Http.get(`/products/${ productId }`);
    }

    static readAll(params?: IQueryParams) {
        return Http.get("/products", params);
    }

    static update(productId: number, product: IProduct) {
        return Http.put(`/products/${ productId }`, product);
    }

    static delete(productId: number) {
        return Http.delete(`/products/${ productId }`);
    }
}
