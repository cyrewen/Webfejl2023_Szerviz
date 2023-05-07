import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { AppointmentService } from '../../shared/services/appointment.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/models/User';
import { MessageService } from '../../shared/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  minDate = new Date();
  pickedDate = new FormControl(new Date());
  timeSlider = new FormControl(0);
  user?: User;

  constructor(private authService: AuthService,
              private userService: UserService,
              private appoService: AppointmentService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().then(fireUser => {
      if(fireUser){
        this.userService.getById(fireUser?.uid).subscribe(user => {
          if(user){
            this.user = user;
          }
          this.user = user;
        }, error => {
          console.error(error);
        });
      }
    }, error => {
      console.error(error);
    });

    // this.weekendFilterManual(this.minDate);
    // this.weekendFilterManual(this.pickedDate.value as Date);
  }

  // weekendFilterManual(d: Date){
  //   const day = d.getDay();
  //   if(day === 0){
  //     d.setDate(day + 1);
  //   }else if(day === 6){
  //     d.setDate(day + 2);
  //   }
  // }

  sliderToTime = (value: number): Date => {
    const d: Date = new Date(0);
    d.setMinutes(420 + (value * 15));
    return d;
  }

  formatLabel(value: number): string {
    if (value <= 32) {
      const d: Date = new Date(0);
    d.setMinutes(420 + (value * 15));
      return d.toTimeString().split(' ')[0].split(':')[0] + ':' + d.toTimeString().split(' ')[0].split(':')[1];
    }
    return "error";
  }

  weekendFilter(d: Date | null): boolean {
    const day = d?.getDay();
    return day !== 0 && day !== 6;
  }

  book() {
    const combinedDate: Date = new Date();
    const pickedDate2: Date = this.pickedDate.value as Date;
    pickedDate2.setHours(0, 0, 0, 0);
    combinedDate.setTime(pickedDate2.getTime() + this.sliderToTime(this.timeSlider.value as number).getTime());
    console.log(combinedDate);
    this.appoService.create({id: '', userId: this.user?.id as string, dateTime: combinedDate}).then(_ => {
      console.log('Appointment successfully created.');
      this.messageService.showSuccessMsg(environment.appointmentCreationSuccessSignal);
    }, error => {
      console.error(error);
      this.messageService.showErrorMsg(environment.appointmentCreationFailedSignal);
    });
  }
}
