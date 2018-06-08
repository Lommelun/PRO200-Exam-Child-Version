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
  users: Child[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {
    let users = JSON.parse(localStorage.getItem('users'));
    this.users = (users) ? users['users'] as Child[] : [] as Child[];
    if (this.users.length == 0) { navCtrl.setRoot('RegisterPage'); }

    let counter = 0;
    this.db.updateUsers(this.users).forEach(child$ => child$.subscribe(user => {
      this.users.forEach(u => {
        if (u.token === user.token) { this.users[counter] = user; }
        counter++;
      });
    }));
  }

  login(user: Child) {
    console.log(JSON.stringify(user))

    localStorage.setItem('user', JSON.stringify(user));

    console.log(JSON.stringify(localStorage.getItem(`user`)))
    console.log(user)
    this.navCtrl.push('LoginPinPage', { 'user': user });
  }

  addUser() {
    this.navCtrl.push('RegisterPage');
  }

  clearUsers() {
    localStorage.clear();
    this.navCtrl.setRoot('RegisterPage');
    this.navCtrl.popToRoot();
  }

}
