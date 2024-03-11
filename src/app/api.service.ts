import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000'; // Adjust this URL to your Express server URL

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, credentials);
  }
}
