import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../shared/services/message.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Appointment } from '../../shared/models/Appointment';
import { AppointmentService } from '../../shared/services/appointment.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  private passwordValidatorRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$';
  oldPassword = new FormControl('', [Validators.required, Validators.pattern(this.passwordValidatorRegex)]);
  newPassword = new FormControl('', [Validators.required, Validators.pattern(this.passwordValidatorRegex)]);
  newPasswordRe = new FormControl('', [Validators.required, Validators.pattern(this.passwordValidatorRegex)]);
  address = new FormControl('');
  user?: User;
  myAppointments: Appointment[] = [];

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private userService: UserService,
              private appoService: AppointmentService) {}

    ngOnInit(): void {
      this.authService.getCurrentUser().then(fireUser => {
        if(fireUser){
          this.userService.getById(fireUser?.uid).subscribe(user => {
            if(user){
              this.user = user;
              this.address.setValue(this.user.address);
              this.appoService.getByUserId(user.id).subscribe(appointments => {
                this.myAppointments = appointments;
              }, error => {
                console.error(error);
              });
            }
            this.user = user;
          }, error => {
            console.error(error);
          });
        }
      }, error => {
        console.error(error);
      });

      
    }

  changePassword(){
    if(this.oldPassword.invalid || this.newPassword.invalid || this.newPasswordRe.invalid){
      this.messageService.showErrorMsg(environment.invalidPasswordErrorSignal);
      return;
    }
    else if(this.newPassword.value !== this.newPasswordRe.value){
      this.messageService.showErrorMsg(environment.passwordMatchErrorSignal);
      return;
    }

    this.authService.getCurrentUser().then(fireUser => {
      if(fireUser){
        fireUser.reauthenticateWithCredential(this.authService.getCredentials(fireUser.email as string, this.oldPassword.value as string)).then(_ => {
          console.log('Reauthentication successful. Old password matches.');
          fireUser.updatePassword(this.newPassword.value as string).then(_ => {
            console.log('Password changed successfully.');
            this.messageService.showSuccessMsg(environment.passwordChangeSuccessSignal);
            this.clearPasswordChange();
          }, error => {
            console.error(error);
            this.messageService.showErrorMsg(environment.passwordChangeFailedSignal);
          });
        }, error => {
          console.error(error);
          this.messageService.showErrorMsg(environment.passwordChangeBadOldPasswordSignal);
        });
      }else{
        console.warn('No logged in user during password change.');
      }
    }, error => {
      console.error('Error getting Firebase user for password change. ' + error);
    });;
  }

  clearPasswordChange() {
    this.oldPassword.reset();
    this.newPassword.reset();
    this.newPasswordRe.reset();
  }

  changeAddress(){
    if(this.user){
      this.user.address = this.address.value as string;
      this.userService.update(this.user).then(_ => {
        console.log('Address successfully changed.');
        this.messageService.showSuccessMsg(environment.addressChangeSuccessSignal);
      }, error => {
        console.error(error);
        this.messageService.showErrorMsg(environment.addressChangeFailedSignal);
      });
    }
  }

  resetAddress(){
    this.address.setValue(this.user?.address as string);
  }
}
