import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pageTitle: string = 'My Store';
  cartProductList!: Product[];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartProductList = this.cartService.getCartProducts();
    this.calculate(this.cartProductList);
  }

  calculate(cart: Product[]): void {
    const total = (cart || []).reduce((sum, item) => sum + Number(item?.amount || 0), 0);
    const cartAmountEl = document.getElementById('cartAmount');
    if (cartAmountEl) {
      cartAmountEl.innerText = total.toString();
    }
  }
}
