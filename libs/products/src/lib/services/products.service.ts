import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  // getProduct(productId: string): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  // }

  // createProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(this.apiURLProducts, product);
  // }

  // deleteProduct(productId: string): Observable<object> {
  //   return this.http.delete<object>(`${this.apiURLProducts}/${productId}`);
  // }

  // updateProduct(product: Product): Observable<Product> {
  //   return this.http.put<Product>(
  //     `${this.apiURLProducts}/${product.id}`,
  //     product
  //   );
  // }
}
