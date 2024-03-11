import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service'; // Update the path as necessary
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.mustMatch });
  }

  mustMatch(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (confirmPasswordControl && passwordControl && 
        confirmPasswordControl.value !== passwordControl.value) {
      confirmPasswordControl.setErrors({ mustMatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.userService.register(user).subscribe({
        next: () => {
          console.log('Registration successful');
          this.router.navigate(['/sign-in']); 
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    } else {
      // If the form is invalid, trigger validation messages.
      this.registerForm.markAllAsTouched();
    }
  }
  

  navigateToSignIn(): void {
    this.router.navigate(['/sign-in']); // Update to the correct route
  }
}
