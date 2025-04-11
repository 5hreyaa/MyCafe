import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = {
    localId: "",
    displayName: "priya"
  };
  orderDetails: any[] = [];

  constructor(private auth: AuthService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.auth.canAccess();

    if (this.auth.isAuthenticated()) {
      this.auth.detail().subscribe({
        next: data => {
          this.user.localId = data.users[0].localId;
          this.user.displayName = data.users[0].displayName;
        }
      });
    }

    // Retrieve order details from the service
    this.orderDetails = this.orderService.getOrderDetails();
    console.log('Order Details:', this.orderDetails); // Debugging statement
  }

  // Calculate total order amount
  getTotalAmount(): number {
    return this.orderDetails.reduce((total, item) => total + item.totalCost, 0);
  }

  // Proceed to Payment with Order Amount
  proceedToPayment(): void {
    const totalAmount = this.getTotalAmount();

    if (totalAmount <= 0) {
      alert('No items in the order. Please add items before proceeding.');
      return;
    }

    // Store order total in localStorage before navigation
    localStorage.setItem('orderAmount', totalAmount.toString());

    // Navigate to the payment page
    this.router.navigate(['/payment']);
  }
}
