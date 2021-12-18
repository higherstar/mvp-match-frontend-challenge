// Interfaces
import { IRole } from "./store.interface";

// Export api interfaces
export interface ILoginData {
    email: string;
    password: string;
}

export interface IRegisterData extends ILoginData {
    role: IRole;
}

export interface IProduct {
    productName: string;
    cost: number;
    amountAvailable: number;
}

export interface IQueryParams {
    search?: string;
    page?: number;
    limit?: number;
    order?: "DESC" | "ASC";
    sortBy?: string;
}
