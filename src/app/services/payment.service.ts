import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  transactionID: any = 0;

  constructor() {}
}
