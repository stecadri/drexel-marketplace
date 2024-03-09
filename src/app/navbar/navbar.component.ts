import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Badge, BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenuModule, 
    MenubarModule, 
    InputTextModule, 
    AvatarModule,
    BadgeModule,
    ButtonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  items: MenuItem[];
  test = "hello";
  ngOnInit() {
      this.items = [
        {
          label: 'File',
          icon: 'pi pi-plus',
          items: [
              {label: 'New', icon: 'pi pi-plus', url: 'http://www.primefaces.org/primeng'},
              {label: 'Open', icon: 'pi pi-download', routerLink: ['/pagename']},
              {label: 'Recent Files', icon: 'pi pi-download', routerLink: ['/pagename'], queryParams: {'recent': 'true'}}
          ]
        },
        {
          label: 'About', routerLink: ['/about']
        },
        {
          label: 'View All Products', routerLink: ['/product-details']
        },
        {
          label: 'Update Your Products', routerLink: ['/update-product']
        },
        {
          label: 'Sign in', routerLink: ['/sign-in']
        },
        {
          label: 'Register', routerLink: ['/register']
        },
    ]
  };

  constructor(private router: Router) {}
  navigateToCart(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/cart']);
  }
  // navigateToCart() {
  //   this.router.navigate(['/cart']); 
  // }

  navigateToAccountPage() {
    this.router.navigate(['/account']); 
  }

  navigateToHomePage() {
    this.router.navigate(['/home']); 
  }
  
}
