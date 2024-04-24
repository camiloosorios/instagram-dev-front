import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost, IPostResponse } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl : string = 'http://localhost:8081/posts';
  private token : string = localStorage.getItem('token')!;

  constructor( private http : HttpClient ) { }

  public findById( id : number ) : Observable<IPost> {
    const url : string = `${this.apiUrl}/${id}`;    
    return this.http.get<IPost>(url);
  }
  
  public findUserPosts( id : number ) : Observable<IPost[]> {
    const url : string = `${this.apiUrl}/user/${id}`;
    const headers : HttpHeaders = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    });
    
    return this.http.get<IPost[]>(url, { headers });
  }

  public findFollowingPosts( userId : number ) : Observable<IPost[]> {
    const url : string = `${this.apiUrl}/following/${userId}`;
    const headers : HttpHeaders = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    });

    return this.http.get<IPost[]>(url, {headers});
  }

  public create( post : IPost ) : Observable<IPostResponse> {
    const headers : HttpHeaders = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    });
    return this.http.post<IPostResponse>(this.apiUrl, post, { headers });
  }

}
