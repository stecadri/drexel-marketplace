import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  _id?: string; // MongoDB's _id for existing products
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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  createProduct(product: Omit<Product, '_id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(productId: string, updatedProduct: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${productId}`, updatedProduct);
  }

  deleteProduct(productId: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${productId}`);
  }

  saveProducts(products: Product[]): Observable<Product[]> {
    const saveRequests = products.map(product => product._id 
      ? this.updateProduct(product._id, product) 
      : this.createProduct(product));
    return forkJoin(saveRequests);
  }
}
