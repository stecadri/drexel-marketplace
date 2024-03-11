import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // Make sure to import the UserService

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService] // Provide the UserService
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.userService.login(this.signInForm.value).subscribe({
        next: () => {
          // Navigate to the account page or dashboard after successful login
          this.router.navigate(['/account']); 
        },
        error: error => {
          console.error('Login error', error);
          // Optionally handle login error, show feedback
        }
      });
    }
  }

  navigateToRegister(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/register']); // Navigate to the registration page
  }
}
