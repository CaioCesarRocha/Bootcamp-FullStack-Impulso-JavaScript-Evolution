export interface IUser{
    id?:number;
    nickname: string,
    email: string,
    isAdmin: boolean,
    avatar: string,
}

export interface IRequestUser{
    id?: number,
    newUser: IUser
}