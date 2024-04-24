export interface IComment {
    content : string,
    postId : number,
    userId : number
}

export interface ICommentResponse {
    id? : number,
    content : string,
    postId : number,
    user : string,
    createdAt? : Date
}