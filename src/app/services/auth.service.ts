import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IAuth, ILogin, IRegister, IResponse } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:8081/users';
  constructor( private http : HttpClient ) { }

  public login(body : ILogin) : Observable<IResponse> {
    const url : string = `${this.apiUrl}/login`;
    return this.http.post<IResponse>(url, body).pipe(
      tap((resp : IResponse) => {
        localStorage.setItem('token', resp.token);    
        localStorage.setItem('username', resp.user.username);    
        localStorage.setItem('id', resp.user.id.toString());    
      })
    );
  }

  public verifyToken() : Observable<IAuth> {
    const token : string = localStorage.getItem('token')!;
    const url : string = `${this.apiUrl}/auth`;

    const headers : HttpHeaders = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });

    return this.http.get<IAuth>(url, { headers });
  }

  public register(body : IRegister) : Observable<IResponse> {
    return this.http.post<IResponse>(this.apiUrl, body);
  }
}
