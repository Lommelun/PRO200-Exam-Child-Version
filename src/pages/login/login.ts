import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Child } from '../../models/child';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  users: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.users = JSON.parse(localStorage.getItem('users')).users;
    console.log(this.users);
  }

  login(user: Child) {
    this.navCtrl.push('LoginPinPage', { 'user': user });
  }

  addUser() {
    this.navCtrl.push('RegisterPage');
  }

  clearUsers() {
    localStorage.clear();
  }

}
