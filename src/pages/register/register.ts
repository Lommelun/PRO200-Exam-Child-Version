import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatabaseProvider } from '../../providers/database/database';

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
    private dbProvider: DatabaseProvider) { }

  registerChild() {
    if (!this.token) return;
    this.dbProvider.getChild(this.token)
    this.navCtrl.setRoot('CategoryOverviewPage')
  }

}
