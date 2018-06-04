import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Child } from '../../models/child';
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  users: Observable<Child[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.users = Observable.from([(JSON.parse(localStorage.getItem('users')).users as Child[])]);
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
