import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { FieldsetModule } from 'primeng/fieldset';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, CardModule, AvatarModule, FieldsetModule, PasswordModule, MessagesModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  providers: [MessageService]
})
export class AccountComponent {
  user: any;

  constructor(private messageService: MessageService) {
    // Get the user info from the server or local storage
    this.user = {
    name: 'Alice',
    email: 'alice@example.com',
    password: '123456',
    confirm: '123456',
    image: './assets/alice.jpg'
    };
  }

  update() {
    // Validate the input
    if (!this.user.name || !this.user.email || !this.user.password || !this.user.confirm) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Please fill in all the fields'});
      return;
    }

    if (this.user.password !== this.user.confirm) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Passwords do not match'});
      return;
    }
    
    // Send the data to the server
    // For simplicity, we assume the server returns a success message
    this.messageService.add({severity:'success', summary:'Success', detail:'Account updated successfully'});  
  }
    
  delete() {
    // Confirm the deletion
    if (confirm('Are you sure you want to delete your account?')) {
    // Send the request to the server
    // For simplicity, we assume the server returns a success message
    this.messageService.add({severity:'success', summary:'Success', detail:'Account deleted successfully'});
    // Redirect to the login page or home page
    }
  }
    
  logout() {
    // Clear the user info from the local storage or session
    this.user = null;
    // Redirect to the login page or home page
  }
}


