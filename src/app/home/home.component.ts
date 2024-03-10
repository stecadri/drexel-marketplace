import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CarouselModule } from 'primeng/carousel'; 
import { ButtonModule } from 'primeng/button'; 
import { ImageModule } from 'primeng/image'; 
import { PrimeNGConfig } from 'primeng/api'; 
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
            CardModule,
            CarouselModule, 
            ButtonModule, 
            FormsModule, 
            ImageModule, 
          ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tutorials: Tutorial[]; 
  
  constructor(private primengConfig: PrimeNGConfig, private router: Router) { } 

  ngOnInit() { 
      this.tutorials = [ 
          { 
              title: 'Welcome to Drexel Marketplace! ', 
              image: 
'https://educationsnapshots.com/wp-content/uploads/sites/4/2017/09/drexel-university-the-summit-5-700x467.jpg', 
          }, 
          { 
              title: 'Buy and Sell Your University Goods', 
              image: 
'https://philafleamarkets.org/wp-content/uploads/2022/05/IMG_0170.jpg', 
          }, 
          { 
              title: 'Connect with Other Drexel Students', 
              image: 
'https://drexel.edu/~/media/Drexel/Core-Site-Group/Core/Images/life-at-drexel/diversity-inclusion/Inclusion_3200x1600/inclusion_3200x1600_160x53.ashx', 
          }, 
      ]; 
  }

  navigateToRegisterPage() {
    this.router.navigate(['/register']); 
  }

  navigateToUpdatePage() {
    this.router.navigate(['/update-product']); 
  }

  navigateToDetailsPage() {
    this.router.navigate(['/product-details']); 
  }
} 
export interface Tutorial { 
  title?: String; 
  image?: String; 
}