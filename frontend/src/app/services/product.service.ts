import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Products } from '../models/products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrlProducts = 'http://localhost:3100/products';

  constructor(private http: HttpClient) { }

  getProducts(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlProducts}?page=${page}&limit=${limit}`);
}


  addProducts(products: Products): Observable<Products[]> {
    // console.log("From services:",products)  //debugging
    return this.http.post<Products[]>(`${this.apiUrlProducts}/addProducts`, products)
  }

  deleteProducts(p_id: Number): Observable<any> {
    return this.http.delete(`${this.apiUrlProducts}/deleteProducts/${p_id}`, { responseType: 'text' });
  }

  updateProducts(data:any): Observable<any> {
    // console.log("from services:",data)  //debugging
    return this.http.put(`${this.apiUrlProducts}/updateProducts/`,data)
  }
}
