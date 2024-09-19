import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {}

  formdata = {
    name: "",
    email: "",
    password: "",
  };

  loading = false;
  submit = false;

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/products']); // Redirect to dashboard if the user is already authenticated
    }
  }

  onSubmit() {
    this.loading = true;
    this.auth.register(this.formdata.name, this.formdata.email, this.formdata.password)
      .subscribe({
        next: data => {
          this.auth.storeToken(data.idToken);
          this.router.navigate(['/products']); // Redirect after successful registration
        },
        error: err => {
          console.error('Registration error:', err);
          this.loading = false;
        }
      })
      .add(() => {
        this.loading = false;
        console.log('Register process is completed');
      });
  }
}
