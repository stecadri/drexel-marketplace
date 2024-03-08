import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product'; 

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
  createProduct(product: Product): Observable<Product> {
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
    return this.http.post<Product[]>(this.apiUrl, products);
  }

}
