import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/profile.interfaces';
import { IFollow, IResponse } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl : string = 'http://localhost:8081/users';

  constructor( private http : HttpClient ) { }

  public findByUsername( username : string ) : Observable<IUser> {
    const url : string = `${this.apiUrl}/find/${username}`;

    return this.http.get<IUser>(url).pipe();
  }

  public findByUsernameOrFullname( param : string ) : Observable<IUser[]> {
    const url : string = `${this.apiUrl}/user/${param}`;

    return this.http.get<IUser[]>(url).pipe();
  }

  public findFollowers( id : number ) : Observable<IUser[]> {
    const url : string = `${this.apiUrl}/followers/${id}`;    
    
    return this.http.get<IUser[]>(url);
  }

  public findFollowing( id : number ) : Observable<IUser[]> {
    const url : string = `${this.apiUrl}/following/${id}`;
    
    return this.http.get<IUser[]>(url);
  }

  public follow(followerId : number, followedId : number) : Observable<IFollow> {
    const url : string = `${this.apiUrl}/follow/${followerId}/${followedId}`;
    const token : string = localStorage.getItem('token')!;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<IFollow>(url, null, {headers : headers});
  }

  public unFollow(followerId : number, followedId : number) : Observable<IFollow> {
    const url : string = `${this.apiUrl}/unfollow/${followerId}/${followedId}`;
    const token : string = localStorage.getItem('token')!;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<IFollow>(url, {headers : headers});
  }

  public edit( body : IUser ) : Observable<IResponse> {
    const token : string = localStorage.getItem('token')!;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<IResponse>(this.apiUrl, body, { headers });
  }
}
