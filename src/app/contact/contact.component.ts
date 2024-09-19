import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css' ] // Corrected here
})
export class ContactComponent {
  // Add the onSubmit method if you need to handle form submission
  onSubmit() {
    console.log('Form submitted');
    // You can add additional logic here
  }
}
