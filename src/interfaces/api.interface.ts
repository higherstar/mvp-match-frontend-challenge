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
