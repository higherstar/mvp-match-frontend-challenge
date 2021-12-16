// Export store interfaces
export type IRole = "buyer" | "seller";

export interface IUser {
    role: IRole;
    deposit: number;
    token: boolean;
    email: string;
}

export interface IState {
    showMenu: boolean;
    showNav: boolean;
    user: IUser;
}
