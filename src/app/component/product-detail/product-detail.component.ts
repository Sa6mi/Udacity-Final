import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntil } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { Subject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}
  
  private ngUnsubscribe = new Subject<void>();
  product!: Product;
  products!: Product[];
  id!: number;
  quantityOptions: string[] = ['1', '2', '3', '4', '5'];
  Quantity = '1';

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.id = Number(params.get('id'));
      });
    this.productService
      .getProduct()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.products = res;
          const p = this.getProductDetails(this.id);
          if (p) {
            this.product = p;
          }
        },
        error: (err) => console.log(err),
      });
  }

  getProductDetails(id: number): Product | undefined {
    return this.products?.find((item) => item.id === id);
  }

  onSelectQuantityChange(value: string) {
    this.Quantity = value;
  }

  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getCartProducts();
    const electedCartProduct = cartProducts.find((p) => p.id === product.id);
    if (electedCartProduct) {
      electedCartProduct.amount = this.Quantity;
      electedCartProduct ? this.productService.addProduct(cartProducts) : null;
    } else {
      cartProducts.push(Object.assign(product, { amount: this.Quantity }));
      this.productService.addProduct(cartProducts);
      alert(`${product.name} has been added to your cart.`);
    }
    this.router.navigate(['/cart']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
