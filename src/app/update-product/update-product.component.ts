import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { Table, TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
// import { Item } from './item';
// import { ItemService } from './itemservice';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ToastModule, TableModule, InputNumberModule, ButtonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  // items: Item[];
  // grandTotal: number;
  
  // constructor(private itemService: ItemService, private messageService: MessageService) { }
  
  // ngOnInit() {
  //   // Get the items from the server or local storage
  //     this.itemService.getItems().then(data => this.items = data);
  //     // Calculate the grand total
  //     this.grandTotal = this.calculateGrandTotal();
  //   }
    
  //   updateTotal(item: Item) {
  //     // Update the total of each item based on the quantity
  //     item.total = item.price * item.quantity;
  //     // Update the grand total
  //     this.grandTotal = this.calculateGrandTotal();
  //   }
    
  //   removeItem(item: Item) {
  //     // Remove the item from the items array
  //     this.items = this.items.filter(i => i.id !== item.id);
  //     // Update the grand total
  //     this.grandTotal = this.calculateGrandTotal();
  //     // Display a success message
  //     this.messageService.add({severity:'success', summary:'Success', detail:'Item removed from cart'});
  //   }
    
  //   addItem() {
  //     // Create a new item with default values
  //     let newItem: Item = {
  //       id: this.items.length + 1,
  //       name: 'New Item',
  //       price: 0,
  //       quantity: 1,
  //       total: 0
  //     };
  //     // Add the new item to the items array
  //     this.items.push(newItem);
  //     // Display a success message
  //     this.messageService.add({severity:'success', summary:'Success', detail:'Item added to cart'});
  //   }
    
  //   saveItems() {
  //   // Send the items data to the server
  //   // For simplicity, we assume the server returns a success message
  //    this.messageService.add({severity:'success', summary:'Success', detail:'Items saved to database'});
  //   }
    
  //   calculateGrandTotal() {
  //     // Calculate the sum of the totals of the items
  //     let total = 0;
  //       for (let item of this.items) {
  //         total += item.total;
  //     }
  //     return total;
  // }
}
