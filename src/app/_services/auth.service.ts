import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  // Check if access is allowed and handle redirection
  canAccess(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  // Updated: Removed the automatic redirection to products
  canAuthenticate(): boolean {
    return this.isAuthenticated();
  }

  register(name: string, email: string, password: string) {
    return this.http.post<{idToken: string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkT6xG-PFgPfNWxZliP06Wn5_x4H-gQWw',
      { displayName: name, email: email, password: password }
    );
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
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
    sessionStorage.removeItem('token');
  }
}
