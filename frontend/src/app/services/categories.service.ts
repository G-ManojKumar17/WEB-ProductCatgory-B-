import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Categories } from '../models/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrlCategories = 'https://web-productcatgory-b.onrender.com';

  constructor(private http: HttpClient) {}

    getCategories(): Observable<Categories[]> {
      return this.http.get<Categories[]>(`${this.apiUrlCategories}/categories`)
    }
 
    addCategories(category: any): Observable<Categories[]> {
      return this.http.post<Categories[]>(`${this.apiUrlCategories}/addCategories`, category)
    }

    deleteCategories(c_id: Number): Observable<any> {
      return this.http.delete(`${this.apiUrlCategories}/deleteCategories/${c_id}`, { responseType: 'text' });
    }

    updateCategories(c_id: Number, c_name:string): Observable<any> {
      // console.log(c_id,c_name)   //debugging
      return this.http.put(`${this.apiUrlCategories}/updateCategories/${c_id}`, {c_name})
    }
}
