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
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ToastModule, TableModule, InputNumberModule, ButtonModule,CurrencyPipe,FormsModule, InputTextModule, FileUploadModule],
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
    this.products = this.products.filter(p => p.id !== product.id);
    // Update the grand total
    this.grandTotal = this.calculateGrandTotal();
    // Display a success message
    this.messageService.add({severity:'success', summary:'Success', detail:'Product removed from cart'});
  }
  
  addProduct() {
    // Create a new product with default values
    let newProduct: Product = {
      id: this.products.length + 1,
      name: 'New Product',
      price: 0,
      quantity: 1,
      total: 0,
      description: 'Default description', // add a default description
      photo: 'default-photo-url',         // add a default photo URL or path
      seller: 'Default seller',           // add a default seller name or ID
      category: ['Default category']        // add a default category
    };
    // Add the new product to the products array
    this.products.push(newProduct);
    // Display a success message
    this.messageService.add({severity:'success', summary:'Success', detail:'Product added to cart'});
  }
  
  saveProducts() {
    this.productService.saveProducts(this.products).subscribe({
      next: (savedProducts) => {
        // Handle the response, maybe update the local products array
        // with the returned one which might contain generated IDs, etc.
        this.products = savedProducts;
        this.messageService.add({severity:'success', summary:'Success', detail:'Products saved to database'});
      },
      error: (error) => {
        // Handle any errors here
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

  onUpload(event: any) {
    // get the file from the event.originalEvent.body
    // this may vary depending on how your server responds
    // for simplicity, we assume the server returns the file object
    // const file = event.originalEvent.body;
    // assign the file to the variable
    // this.uploadedImage = file;
  }

}
