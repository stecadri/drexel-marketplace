import { AfterViewInit, Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MessageService } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

// import { Product, products } from '../products';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ToastModule, TableModule, InputNumberModule, ButtonModule,CurrencyPipe,FormsModule, InputTextModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [ProductService,MessageService]
})



export class ProductDetailsComponent {
  products: Product[] = []; 
  grandTotal: number;
  @ViewChild('dt') dt: any; 

  constructor(private productService: ProductService, private messageService: MessageService) {
    console.log('ProductService:', productService);
    console.log('MessageService:', messageService);
  }
    
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('There was an error retrieving products:', error);
      },
      complete: () => {
        console.log('Product retrieval completed');
      }
    });
  }

  filterProducts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(filterValue, 'contains');
  }
}
