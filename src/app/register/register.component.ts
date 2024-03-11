import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardModule, InputTextModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService) { }

  register(): void {
    this.apiService.register(this.user).subscribe(
      (response) => {
        console.log('User registered', response);
        // Handle successful registration, e.g., redirecting to the login page
      },
      (error) => {
        console.error('Registration error', error);
        // Handle error
      }
    );
  }
}
