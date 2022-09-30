import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _ulr: string = environment.baseURL;
  private _user!: User;

  public get user(): User {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    const url = `${this._ulr}/auth`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((response) => {
        if (response.ok) {
          localStorage.setItem('token', response.token!);
        }
      }),
      map((response) => response.ok),
      catchError((httpError) => of(httpError.error.msg))
    );
  }

  signUp(name: string, email: string, password: string) {
    const url = `${this._ulr}/auth/new`;
    const body = { name, email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((response) => {
        if (response.ok) {
          localStorage.setItem('token', response.token!);
        }
      }),
      map((response) => response.ok),
      catchError((httpError) => of(httpError.error.msg))
    );
  }

  validateToken(): Observable<boolean> {
    const url = `${this._ulr}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((response) => {
        localStorage.setItem('token', response.token!);
        this._user = {
          name: response.name!,
          uid: response.uid!,
          email: response.email!,
        };
        return response.ok;
      }),
      catchError((httpError) => of(false))
    );
  }

  singOut() {
    localStorage.clear();
  }
}
