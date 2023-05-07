import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  address: string = '1234 Fake City Fake Ave. 5';
  email: string = 'help@erikarepair.com';
  phone: string = '1234-567-89';
  copyTooltip: string = 'Copy to clipboard';
}
