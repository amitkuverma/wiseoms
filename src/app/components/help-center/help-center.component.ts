import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './help-center.component.html',
  styleUrl: './help-center.component.css'
})
export class HelpCenterComponent {

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      console.log('Form Submitted!', contactForm.value);
      // You can handle the form submission logic here (e.g., sending the form data to the backend)
    } else {
      console.log('Form is invalid');
    }
  }
  
}
