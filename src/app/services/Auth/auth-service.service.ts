import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = 'http://localhost:8081';

  constructor(private http:HttpClient) { }

  authSubject = new BehaviorSubject<any>({
      user : null

  })
  
  login(userData:any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, userData)
  }
  register(userData:any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, userData)
  }
  getUserProfile():Observable<any> {
    const headers = new HttpHeaders ({
      Authorization:`Bearer ${localStorage.getItem("jwt")}`
    })
    return this.http.get<any>(`${this.baseUrl}/api/auth/signup`, {headers}).pipe(
      tap((user: any)=>{ console.log("get user profile", user); const currentState=this.authSubject.value; this.authSubject.next({...currentState, user}) })
    )
  }

  logout() {
    localStorage.clear()
    this.authSubject.next({})
  }
}
