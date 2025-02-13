import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.authService.isAuthenticated().subscribe(status => {
      this.isAuthenticated = status;
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in valid email and password.';
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/']); // Redirect after successful login
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      },
      error: () => {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }
}
