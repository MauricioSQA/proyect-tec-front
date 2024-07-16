import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TotalPriceService {
  totalPrice: number = 0;

  setTotalPrice(price: number) {
    this.totalPrice = price;
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }
}
