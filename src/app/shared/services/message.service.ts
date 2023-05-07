import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastrService: ToastrService) { }

  showSuccessMsg(msg: string){
    let successMsg = '';
    if(msg === environment.passwordChangeSuccessSignal){
      successMsg = 'Password changed successfully.';
    }
    else if(msg === environment.addressChangeSuccessSignal){
      successMsg = 'Address successfully changed.'
    }
    else if(msg === environment.appointmentCreationSuccessSignal){
      successMsg = 'Appointment successfully booked.'
    }
    else{
      successMsg = 'Unknown success. You should not see this.'
    }

    this.toastrService.success(successMsg);
  }

  showErrorMsg(msg: string){
    let errorMsg = '';
    if(msg === environment.invalidEmailErrorSignal){
      errorMsg = 'Invalid e-mail.';
    }
    else if(msg === environment.invalidPasswordErrorSignal){
      errorMsg = 'Invalid password.';
    }
    else if(msg === environment.passwordMatchErrorSignal){
      errorMsg = 'The passwords don\'t match.';
    }
    else if(msg.includes('auth/user-not-found')){
      errorMsg = 'Login failed: incorrect e-mail.';
    }
    else if(msg.includes('auth/wrong-password')){
      errorMsg = 'Login failed: incorrect password.';
    }
    else if(msg ===environment.passwordChangeFailedSignal){
      errorMsg = 'Password change failed. Try logging in again.';
    }
    else if(msg ===environment.passwordChangeBadOldPasswordSignal){
      errorMsg = 'Incorrect old password.';
    }
    else if(msg ===environment.addressChangeFailedSignal){
      errorMsg = 'Failed to change address.';
    }
    else if(msg ===environment.appointmentCreationFailedSignal){
      errorMsg = 'Failed to create an appointment.';
    }
    else{
      errorMsg = 'Unknown error.'
    }

    this.toastrService.error(errorMsg);
  }
}
