import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { FieldsetModule } from 'primeng/fieldset';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { UserService } from '../user.service'; // Import UserService
import { Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule,InputTextModule, ButtonModule, FormsModule, CardModule, AvatarModule, FieldsetModule, PasswordModule, MessagesModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService, UserService] // Include UserService in providers
})
export class AccountComponent implements OnInit {
  user: any = null; 

  constructor(
    private messageService: MessageService,
    private userService: UserService 
  ) {}

  ngOnInit() {
    this.user = this.userService.currentUserValue; 
    if (!this.user) {
      this.messageService.add({severity:'warn', summary:'Not Signed In', detail:'Please sign in to view account information.'});
    }
  }
  update() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Account updated successfully'});
  }

  delete() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Account deleted successfully'});
    // this.router.navigate(['/login']); 
  }

  logout() {
    this.userService.logout(); 
    // this.router.navigate(['/login']); 
  }
}
