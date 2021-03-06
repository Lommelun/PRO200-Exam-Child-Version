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
    try{
    this.dbProvider.getChildByToken(this.token)
      .then(child => 
        { this.user = child; this.success(); 
      })
      .catch(error => { 
         this.fail() 
        });
      }catch(e){
        console.log("YOOO", e)
      }finally{
        loading.dismiss();
      }
  }

  nextStep() {
    this.step++;
    if (this.pin1 === this.pin2 && this.pin1 != undefined) {
      this.user.pin = this.pin1.toString();
      this.login();
    } else if (this.step > 2) {
      this.toast.create({
        duration: 4000,
        message: 'Sørg for at du skriver riktig passord',
        position: 'top',
        cssClass: "redToastStyle",


      }).present();
      this.step = 1;
    }
  }

  fail() {
    this.toast.create({
      duration: 5000,
      message: 'Kunne ikke finne et barn med denne verifiseringskoden',
      position: 'top',
      cssClass: "redToastStyle",

    }).present();
  }

  success() {
    this.toast.create({
      duration: 5000,
      message: 'Fant ' + this.user.name + '!',
      position: 'top',
      cssClass: "greenToastStyle",


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
