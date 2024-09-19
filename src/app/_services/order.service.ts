// src/app/_services/order.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderDetails: any[] = [];

  setOrderDetails(details: any[]): void {
    this.orderDetails = details;
  }

  getOrderDetails(): any[] {
    return this.orderDetails;
  }
}
