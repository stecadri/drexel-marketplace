import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
// import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CardModule, InputTextModule, ButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService) { }

  login(): void {
    this.apiService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Handle login success, e.g., store the user token, navigate to the dashboard
      },
      (error) => {
        console.error('Login error', error);
        // Handle error
      }
    );
  }
}
