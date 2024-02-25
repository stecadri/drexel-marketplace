import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenuModule, MenubarModule, InputTextModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

//  TODO:
//  Figure out why menuitem elements such as icon and badge are not working as per 
//  https://primeng.org/menus

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
          label: 'Home', routerLink: ['/home']
        },
        {
          label: 'About', routerLink: ['/about']
        },
        {
          label: 'Cart',
          badge: '123'
        }
        
    ]
  }
}
