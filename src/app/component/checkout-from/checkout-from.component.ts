import { ActivatedRoute } from '@angular/router';
import {OnInit, Component  } from '@angular/core';

@Component({
  selector: 'app-checkout-from',
  templateUrl: './checkout-from.component.html',
  styleUrls: ['./checkout-from.component.scss'],
})
export class CheckoutFromComponent implements OnInit {
  firstName!: string | null;
  totalPrice!: number;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.firstName = params.get('firstName');
    this.totalPrice = Number(params.get('totalPrice') || 0);
  }
}
