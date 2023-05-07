import { Location } from '@angular/common';
import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';
import { MessageService } from '../../shared/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {
  @ViewChildren('#firstInput') firstInput?: QueryList<any>;
  firstInputElement: any;
  private sub?: Subscription;
  //credit for regex goes to https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  private passwordValidatorRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$';

  constructor(private location: Location,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService) { }

  ngAfterViewInit(): void {
    this.sub = this.firstInput?.changes.subscribe(res => {
      if (this.firstInput?.length === 1) {
        this.firstInputElement = this.firstInput.first.nativeElement;
        console.log(this.firstInputElement);

      }
    });
  }

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordValidatorRegex)]),
    repassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordValidatorRegex)]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required])
    }),
    address: new FormControl('')
  });

  register() {
    if (this.registerForm.get('email')?.invalid) {
      this.messageService.showErrorMsg(environment.invalidEmailErrorSignal);
      return;
    } else if (this.registerForm.get('password')?.invalid) {
      this.messageService.showErrorMsg(environment.invalidPasswordErrorSignal);
      return;
    } else if (this.registerForm.get('password')?.value !== this.registerForm.get('repassword')?.value) {
      this.messageService.showErrorMsg(environment.passwordMatchErrorSignal);
      return;
    }

    this.authService.register(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).then(credentials => {
      console.log(credentials);
      const user: User = {
        id: credentials.user?.uid as string,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        name: {
          firstname: this.registerForm.get('name.firstname')?.value,
          lastname: this.registerForm.get('name.lastname')?.value
        },
        address: this.registerForm.get('address')?.value
      }

      this.userService.create(user).then(_ => {
        console.log('User created successfully!');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }

  resetForm() {
    this.registerForm.reset();
    this.firstInputElement.focus();
  }

  goBack() {
    this.location.back();
  }
}
