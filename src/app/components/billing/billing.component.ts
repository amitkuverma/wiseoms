import { Component } from '@angular/core';
import { PricingComponent } from "../pricing/pricing.component";

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [PricingComponent],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {

}
