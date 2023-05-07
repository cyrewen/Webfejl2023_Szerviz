import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailAuthProvider } from '@angular/fire/auth/';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private router: Router,
              private messageService: MessageService) {}

  login(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout(){
    return this.fireAuth.signOut();
  }

  isLoggedIn(){
    return this.fireAuth.user;
  }

  getCredentials(email: string, password: string){
    return EmailAuthProvider.credential(email, password);
  }

  getCurrentUser(){
    return this.fireAuth.currentUser;
  }
}
