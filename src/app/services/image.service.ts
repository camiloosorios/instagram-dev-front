import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostResponse } from '../interfaces/post.interface';
import { IImageResponse } from '../interfaces/image.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl : string = 'http://localhost:8081/images';
  private token : string = localStorage.getItem('token')!;

  constructor( private http : HttpClient ) { }

  public create( body: FormData ) : Observable<IPostResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post<IPostResponse>(this.apiUrl, body, {headers});
  }
  
  public get( fileName : string ) : Observable<IImageResponse> {
    const url : string = `${this.apiUrl}?fileName=${fileName}`
    const headers : HttpHeaders = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    });
    
    return this.http.get<IImageResponse>(url, {headers});
  }
}
