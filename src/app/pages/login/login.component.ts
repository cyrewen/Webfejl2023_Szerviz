import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private passwordValidatorRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$';
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(this.passwordValidatorRegex)]);

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  login() {
    if(this.email.invalid){
      this.messageService.showErrorMsg(environment.invalidEmailErrorSignal);
      return;
    }else if(this.password.invalid){
      this.messageService.showErrorMsg(environment.invalidPasswordErrorSignal);
      return;
    }

    this.authService.login(this.email.value as string, this.password.value as string).then(credentials => {
      console.log('Login successful: ' + credentials);
    }, error => {
      console.error('Login failed: ' + error);
      this.messageService.showErrorMsg(String(error));
    });
  }

}
