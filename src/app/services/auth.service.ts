import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { userKey } from '../core/constants/authconstants';

import { IsigninData } from '../shared/interfaces/signinData';
import { IsignupData } from '../shared/interfaces/signupData';
import { baseUrl } from './boards.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  signup(userData: IsignupData) {
    return this.http.post<IsignupData>(`${baseUrl}auth/signup`, userData);
  }
  signin(userData: IsigninData): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${baseUrl}auth/signin`, userData)
      .pipe(
        tap((user) => {
          localStorage.setItem(userKey, JSON.stringify(user));
          this.setToken(user.token);
        })
      );
  }

  setToken(token: string) {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem(userKey);
    return !!user;
  }

  logout() {
    this.setToken('');
    localStorage.clear();
    this.toastr.success('You have successfully logged out');
  }
}
