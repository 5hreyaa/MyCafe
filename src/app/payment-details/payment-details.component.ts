import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  paymentForm!: FormGroup;
  selectedPaymentMethod: string = '';
  amount: number = 0;
  submitted = false;
  paymentSuccess = false;  // To show success message after payment

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router  // Changed from private to public
  ) {}

  ngOnInit(): void {
    // Get the payment method from URL parameters or session storage
    this.route.queryParams.subscribe(params => {
      if (params['method']) {
        this.selectedPaymentMethod = params['method'];
        sessionStorage.setItem('selectedPaymentMethod', this.selectedPaymentMethod);
      } else {
        this.selectedPaymentMethod = sessionStorage.getItem('selectedPaymentMethod') ?? '';
      }
    });

    this.amount = parseFloat(sessionStorage.getItem('orderAmount') ?? '0');

    // Initialize form with appropriate validators based on payment method
    this.initializeForm();
  }

  // Optional: Add this method if you prefer not to make router public
  navigateBack(): void {
    this.router.navigate(['/payment-selection']);
  }

  initializeForm(): void {
    // Create form with validators specific to the selected payment method
    switch (this.selectedPaymentMethod) {
      case 'Credit Card':
      case 'Debit Card':
        this.paymentForm = this.fb.group({
          cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
          expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
          cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
        });
        break;

      case 'UPI':
        this.paymentForm = this.fb.group({
          upiId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+$/)]]
        });
        break;

      case 'Cash on Delivery':
        this.paymentForm = this.fb.group({});
        break;

      default:
        // If no payment method selected, redirect back to selection
        this.router.navigate(['/payment-selection']);
        break;
    }
  }

  processPayment(event: Event): void {
    event.preventDefault(); // Prevent form submission causing a page reload
    this.submitted = true;

    if (this.paymentForm.invalid && this.selectedPaymentMethod !== 'Cash on Delivery') {
      return;
    }

    // Simulate Payment Success (You can integrate actual payment gateway here)
    this.paymentSuccess = true;

    setTimeout(() => {
      alert(`Payment of ₹${this.amount} via ${this.selectedPaymentMethod} successful!`);
      // Navigate to order confirmation page
      this.router.navigate(['/order-confirmation']);
    }, 500);
  }
}
