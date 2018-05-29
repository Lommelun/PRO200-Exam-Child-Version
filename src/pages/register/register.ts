import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dbProvider: DatabaseProvider,
    private toast: ToastController) { }

  registerChild() {
    if (!this.token) return;
    this.dbProvider.getChild(this.token)
      .subscribe(child => this.success(child), error => this.fail());
  }

  fail() {
    this.toast.create({
      duration: 1500,
      message: 'Kunne ikke finne et barn med denne koden',
      position: 'top'
    }).present();
  }

  success(child: Child) {
    let children = { 'children' : [child] }

    if (localStorage.getItem('users')) {
      children.children.push(...JSON.parse(localStorage.getItem('users')).children)
    }

    localStorage.setItem('users', JSON.stringify(children));
    this.navCtrl.setRoot('LoginPage');
    this.navCtrl.popToRoot();
  }

}
