import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './shared/models/User';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webfejl2023-szerviz-erik';
  environment = environment;
  currentPage = '';
  currentUser: User | null | undefined = null;
  profileTooltip = 'User Profile';

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService){

  }

  ngOnInit(): void {
      this.authService.isLoggedIn().subscribe(fireUser => {
        console.log('fireUser ' + fireUser + ' ' + new Date());
        if(fireUser){
          console.log('in here');
          let sub: Subscription = this.userService.getById(fireUser?.uid as string).subscribe(user => {
            console.log('user ' + user + ' ' + new Date());
            if(user){
              localStorage.setItem('isLoggedIn', 'yes');
              this.currentUser = user;
              if(this.router.url.endsWith('login') || this.router.url.endsWith('register')){
                this.router.navigateByUrl('/booking');
              }
            }
          }, error => {
            console.error(error);
          }, () => {
            sub.unsubscribe();
          });
        }
      }, error => {
        console.error(error);
      });
  }

  logout(_: boolean = true){
    this.authService.logout().then(_ => {
      console.log('User logged out successfully');
      localStorage.removeItem('isLoggedIn');
      this.currentUser = null;
      
    }, error => {
      console.error('Logout failed: ' + error);
    });
  }
}
