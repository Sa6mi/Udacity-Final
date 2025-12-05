import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  localStorage = window.localStorage;
    emptyCart(): void {
    this.localStorage.clear();
  }
    getCartProducts() {
    const localStorageProducts = this.localStorage.getItem('products');
    return localStorageProducts ? JSON.parse(localStorageProducts) : [];
  }
}
