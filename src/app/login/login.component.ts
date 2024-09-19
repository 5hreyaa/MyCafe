import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formdata = {
    email: "",
    password: ""
  };
  submit = false;
  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.submit = true;

    if (this.formdata.email && this.formdata.password) {
      this.loading = true;
      this.auth.login(this.formdata.email, this.formdata.password).subscribe({
        next: data => {
          this.auth.storeToken(data.idToken);
          this.router.navigate(['/products']);  // Redirect to products after successful login
        },
        error: data => {
          console.error('Login error:', data);
          if (data.error?.error?.message === "INVALID_PASSWORD" || data.error?.error?.message === "INVALID_EMAIL") {
            this.errorMessage = "Invalid credentials!";
          } else {
            this.errorMessage = "An error occurred. Please try again.";
          }
        }
      }).add(() => {
        this.loading = false;
      });
    }
  }
}
