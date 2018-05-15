import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 public uuid:string; 
 public family:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dbProvider:DatabaseProvider) {
  }

  findUser(uuid?:string){
    if(!uuid) { return; }  

     this.family = this.dbProvider.getFamily(uuid);
     if(this.family.children){
        this.navCtrl.setRoot('HomePage',{fam:this.family})
        console.log("Found children")
     }
  }

}
