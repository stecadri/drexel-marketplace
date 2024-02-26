import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CardModule, InputTextModule, ButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
