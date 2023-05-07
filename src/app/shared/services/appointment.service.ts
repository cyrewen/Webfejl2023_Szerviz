import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private afs: AngularFirestore) { }

  collectionName = 'Appointments';

  create(appointment: Appointment) {
    appointment.id = this.afs.createId();
    return this.afs.collection<Appointment>(this.collectionName).doc(appointment.id).set(appointment);
  }

  getAll() {
    return this.afs.collection<Appointment>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Appointment>(this.collectionName).doc(id).valueChanges();
  }

  getByUserId(userId: string){
    return this.afs.collection<Appointment>(this.collectionName, ref => ref.where('userId', '==', userId)).valueChanges();
  }

  update(appointment: Appointment) {
    return this.afs.collection<Appointment>(this.collectionName).doc(appointment.id).set(appointment);
  }

  delete(id: string) {
    return this.afs.collection<Appointment>(this.collectionName).doc(id).delete();
  }
}
