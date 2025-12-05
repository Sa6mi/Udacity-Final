import { Product } from 'src/app/model/product';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() productItem!: Product;
  Quantity = '1';
  quantityOptions: string[] = ['1', '2', '3', '4', '5'];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  refresh(): void {
    window.location.reload();
  }
  
  onSelectQuantityChange(value: any) {
    this.Quantity = value;
  }
  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getCartProducts();
    const electedCartProduct = cartProducts.find((p) => p.id === product.id);
    if (electedCartProduct) {
      electedCartProduct.amount = this.Quantity;
      this.productService.addProduct(cartProducts);
      alert(`Updated ${product.name} to x${this.Quantity} in your cart.`);
    } else {
      cartProducts.push(Object.assign(product, { amount: this.Quantity }));
      this.productService.addProduct(cartProducts);
      alert(`${product.name} (x${this.Quantity}) added to your cart.`);
    }
  }
}
