export interface IPost {
    id?: number,
    image : string,
    description : string,
    userId : number,
    user? : string
    createdAt? : Date,
}

export interface IPostResponse {
    message : string
}