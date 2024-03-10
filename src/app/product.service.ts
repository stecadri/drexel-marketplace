import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  _id?: string; 
  name: string;
  description: string;
  photo: string;
  seller: string;
  price: number;
  quantity: number;
  total: number;
  category: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products'; 

  constructor(private http: HttpClient) { }

  // Method to fetch all products from the backend
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Method to fetch a single product by ID from the backend
  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  // Method to create a new product on the backend
  createProduct(product: Omit<Product, '_id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Method to update an existing product on the backend
  updateProduct(productId: string, updatedProduct: Partial<Product>): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.patch<Product>(url, updatedProduct);
  }

  // Method to delete a product by ID from the backend
  deleteProduct(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<Product>(url);
  }

  saveProducts(products: Product[]): Observable<Product[]> {
    const saveRequests = products.map(product => {
      if (product._id) {
        // If _id exists, it's an update operation
        return this.updateProduct(product._id, product);
      } else {
        // If no _id, it's a create operation
        return this.createProduct(product);
      }
    });

    // Use forkJoin to execute all requests concurrently and wait for all to complete
    return forkJoin(saveRequests).pipe(
      map(responses => responses.filter(response => !!response)) // Filter out any undefined responses (if any)
    );
  }
}
