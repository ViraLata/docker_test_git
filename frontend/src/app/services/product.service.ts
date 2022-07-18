import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
const baseUrl = 'http://localhost:4000/products';
const baseSearch = 'http://localhost:4000/search_products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }
  get(id: any): Observable<Product> {
    //console.log(`${baseUrl}/${id}`)
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/`,  {id: data.id, name_product: data.name_product, description: data.description, price: data.price} );
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByName(name_product: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseSearch}/${name_product}`);
  }
}
