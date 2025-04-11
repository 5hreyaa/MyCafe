import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

  isAuthenticated(): boolean {
    return typeof window !== 'undefined' && sessionStorage.getItem('token') !== null;
  }

  canAccess(): boolean {
    if (!this.isAuthenticated() && typeof window !== 'undefined') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canAuthenticate(): boolean {
    return this.isAuthenticated();
  }

  register(name: string, email: string, password: string) {
    return this.http.post<{idToken: string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkT6xG-PFgPfNWxZliP06Wn5_x4H-gQWw',
      { displayName: name, email: email, password: password }
    );
  }

  storeToken(token: string) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('token', token);
    }
  }

  login(email: string, password: string) {
    return this.http.post<{idToken: string}>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkT6xG-PFgPfNWxZliP06Wn5_x4H-gQWw',
      { email: email, password: password }
    );
  }

  detail() {
    let token = sessionStorage.getItem('token');
    return this.http.post<{users: Array<{localId: string, displayName: string}>}>('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAkT6xG-PFgPfNWxZliP06Wn5_x4H-gQWw',
      { idToken: token }
    );
  }

  removeToken() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
    }
  }
}
