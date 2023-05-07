import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private authService: AuthService){

  }

  @Input() sidenav?: MatSidenav;
  @Input() currentUser?: User | null | undefined = null;
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();


}
