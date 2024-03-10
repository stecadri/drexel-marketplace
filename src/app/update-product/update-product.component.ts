import { AfterViewInit, Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../product.service';
import { Product } from '../product.service';
import { MessageService } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ToastModule, TableModule, InputNumberModule, ButtonModule,CurrencyPipe,FormsModule, InputTextModule, FileUploadModule, CardModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [ProductService,MessageService]
})
export class UpdateProductComponent{
  products: Product[] = []; 
  grandTotal: number;
  @ViewChild('dt') dt: any; 
  uploadedImage: any; // a variable to store the uploaded image

  constructor(private productService: ProductService, private messageService: MessageService) {
    console.log('ProductService:', productService);
    console.log('MessageService:', messageService);
  }
    
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.grandTotal = this.calculateGrandTotal();
      },
      error: (error) => {
        console.error('There was an error retrieving products:', error);
      },
      complete: () => {
        console.log('Product retrieval completed');
      }
    });
  }
  

  updateTotal(product: Product) {
    // Update the total of each product based on the quantity
    product.total = product.price * product.quantity;
    // Update the grand total
    this.grandTotal = this.calculateGrandTotal();
  }
  
  removeProduct(product: Product) {
    // Remove the product from the products array
    this.products = this.products.filter(p => p._id !== product._id);
    // Update the grand total
    this.grandTotal = this.calculateGrandTotal();
    // Display a success message
    this.messageService.add({severity:'success', summary:'Success', detail:'Product removed from cart'});
  }
  
  addProduct() {
    // Create a new product with default values
    let newProduct: Partial<Product> = {
      name: 'New Product',
      price: 0,
      quantity: 1,
      total: 0,
      description: 'Default description',
      photo: 'Default photo', 
      seller: 'Default seller',           
      category: ['Default category']        
    };
    // Add the new product to the products array
    this.products.push(newProduct as Product); // Since _id is not present, we assert it as Product
    // Display a success message
    this.messageService.add({severity:'success', summary:'Success', detail:'Product added to cart'});
  }
  
  saveProducts() {
    this.productService.saveProducts(this.products).subscribe({
      next: (savedProducts) => {

        this.products = savedProducts;
        this.messageService.add({severity:'success', summary:'Success', detail:'Products saved to database'});
      },
      error: (error) => {
        console.error('Error saving products:', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Could not save products to database'});
      }
    });
  }
  calculateGrandTotal() {
    // Calculate the sum of the totals of the products
    let total = 0;
    for (let product of this.products) {
      total += product.total;
    }
    return total;
  }
  filterProducts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(filterValue, 'contains');
  }
  onUpload(event: any, product: any): void {
    if (event.files && event.files.length) {
      const file = event.files[0];
      const reader = new FileReader();
    
      reader.onload = (e: any) => {
        // Assuming 'imageUrl' is the correct property on the product to hold the image data
        product.imageUrl = e.target.result; // This should be the base64 data URL
        this.refreshProducts(); // Refresh the products array to trigger change detection
      };
  
      reader.readAsDataURL(file); // This will read the file as a data URL (base64)
    }
  }
  
  refreshProducts(): void {
    this.products = [...this.products];
  }
  
  


  

}
