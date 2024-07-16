import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TotalPriceService } from '../../../services/total-price.service';
import { Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  totalPrice: number = 0;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(
    private totalPriceService: TotalPriceService,
    private payment: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.totalPrice = this.totalPriceService.getTotalPrice();
    window.paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalPrice.toString(),
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              this.payment.transactionID = details.id;
              this.router.navigate(['confirm']);
            }
          });
        },
        onError: (error: any) => {
          console.log(error);
        },
      })
      .render(this.paymentRef.nativeElement);
  }

  cancel() {
    this.router.navigate(['shopping']);
  }
}
