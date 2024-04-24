export interface ILogin {
    email : string,
    password : string
}

export interface IRegister {
    name : string,
    lastname : string,
    username : string,
    email : string,
    password : string
}

export interface IFollow {
    message : string
}

export interface IUser {
    id : number
    name : string,
    lastname : string,
    username : string,
    email : string,
    password : string,
    createdAt : Date
}

export interface IResponse {
    message : string,
    token : string,
    user : IUser
}

export interface IAuth {
    message : boolean
}