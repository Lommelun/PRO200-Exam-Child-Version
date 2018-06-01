import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatabaseProvider } from '../../providers/database/database';
import { Child } from '../../models/child';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public token: string;
  public family: any;
  public step: number = 0;
  public user: Child;
  pin1: number;
  pin2: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dbProvider: DatabaseProvider,
    private toast: ToastController,
    private loading: LoadingController
  ) { }

  registerChild() {
    if (!this.token) return;

    const loading = this.loading.create({
      content: 'Verifiserer...',
      enableBackdropDismiss: false
    });
    loading.present();

    this.dbProvider.getChild(this.token)
      .subscribe(child => { loading.dismiss(); this.user = child; this.success(); },
        error => { loading.dismiss(); this.fail() });
  }

  nextStep() {
    this.step++;
    if (this.pin1 === this.pin2 && this.pin1 != undefined) {
      this.login();
    } else if (this.step > 2) {
      this.toast.create({
        duration: 1500,
        message: 'Sørg for at du skriver riktig pinkode',
        position: 'top'
      }).present();
      this.step = 1;
    }
  }

  fail() {
    this.toast.create({
      duration: 1500,
      message: 'Kunne ikke finne et barn med denne koden',
      position: 'top'
    }).present();
  }

  success() {
    this.toast.create({
      duration: 1500,
      message: 'Fant ' + this.user.name + '!',
      position: 'top'
    }).present();
    this.nextStep();
  }

  login() {
    let users = { 'users': [this.user] }

    if (localStorage.getItem('users')) {
      users.users.push(...JSON.parse(localStorage.getItem('users')).users)
    }

    localStorage.setItem('users', JSON.stringify(users));
    this.navCtrl.setRoot('LoginPage');
    this.navCtrl.popToRoot();
  }

}
