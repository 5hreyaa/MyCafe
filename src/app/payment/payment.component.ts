import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  amount: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get amount from session storage or set default
    this.amount = parseFloat(sessionStorage.getItem('orderAmount') ?? '0');

    // If no amount is set, you might want to redirect to products page
    if (this.amount === 0) {
      // For demo purposes, set a default amount
      this.amount = 200;
      sessionStorage.setItem('orderAmount', this.amount.toString());
    }
  }

  handlePaymentOption(method: string): void {
    // Save selected payment method to session storage
    sessionStorage.setItem('selectedPaymentMethod', method);

    // Navigate to payment details page with the selected method as a parameter
    this.router.navigate(['/payment-details'], {
      queryParams: { method: method }
    });
  }
}
