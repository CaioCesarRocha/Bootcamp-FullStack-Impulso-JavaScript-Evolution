export interface IUser{
    id?:string;
    nickname: string,
    email: string,
    isAdmin: boolean,
    avatar: string,
}

export interface IRequestUser{
    id?: string,
    newUser: IUser
}