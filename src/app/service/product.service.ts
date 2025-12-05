import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  localStorage = window.localStorage;
  private readonly apiDataUrl = 'http://localhost:4200/assets/data.json';

  constructor(private readonly httpClient: HttpClient) {}
  getProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiDataUrl);
  }
  addProduct(productList: Product[]): void {
    this.localStorage.setItem('products', JSON.stringify(productList));
  }

  getProductById(productId: number): Observable<Product> {
    const requestUrl = `${this.apiDataUrl}/${productId}`;
    return this.httpClient
      .get<Product>(requestUrl)
      .pipe(catchError(this.handleHttpError<Product>(`fetch Product id=${productId}`)));
  }

  private handleHttpError<T>(operationName = 'operation', fallbackResult?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operationName} failed:`, error);
      return of(fallbackResult as T);
    };
  }
}
