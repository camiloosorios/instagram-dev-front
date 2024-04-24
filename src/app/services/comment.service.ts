import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/auth.interfaces';
import { IComment, ICommentResponse } from '../interfaces/comment.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl : string = 'http://localhost:8081/comments';

  constructor( private http : HttpClient ) { }

  public findComments( postId : number ) : Observable<ICommentResponse[]> {
    const url : string = `${this.apiUrl}/post/${postId}`;

    return this.http.get<ICommentResponse[]>(url);
  }

  public create( comment : IComment ) : Observable<IResponse> {
    const headers : HttpHeaders = new HttpHeaders({
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<IResponse>(this.apiUrl, comment, { headers });
  }
}
