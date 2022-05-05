import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { config } from '../../environments/environment';
import { User } from '../models/user';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_ID = 'USER_ID';
  private readonly USER_NAME = 'USER_NAME';
  private loggedUser: User;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  register(user: User): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/register`, user)
      .pipe(
        catchError(error => {
          alert(error.error.toString());
          return of(null);
        }));
  }

  updateUser(user: User): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/updateUser`, user)
      .pipe(
        tap(() => this.loggedUser),
        mapTo(true),
        catchError(error => {
          alert(error.error.toString());
          return of(false);
        }));
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<any>(`${config.apiUrl}/getUserById/`+id)
      .pipe(
        catchError(error => {
          alert(error.error);
          return of(null);
        }));
  }

  getAllUsers():Observable<any>{
    return this.http.get<any>(`${config.apiUrl}/getAllUsers`)
      .pipe(
        catchError(error => {
          alert(error.error);
          return of(null);
        }));
  }

  logout() {
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(tokens: any) {
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.USER_ID, tokens.userid);
    localStorage.setItem(this.USER_NAME, tokens.username);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem(this.USER_NAME);
  }

  //constructor(private http: HttpClient) { }
  //login(data): Observable<any> {
  //  return this.http.post(`${config.apiUrl}/login`, data);
  //}





}
