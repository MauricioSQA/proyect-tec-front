import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent implements OnInit {
  transactionId = '';

  constructor(private payment: PaymentService) {}

  ngOnInit(): void {
    this.transactionId = this.payment.transactionID;
  }
}
