import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Child } from '../../models/child';

/**
 * Generated class for the LoginPinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-pin',
  templateUrl: 'login-pin.html',
})
export class LoginPinPage {
child: Child;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.child = this.navParams.get("child");
  }

}