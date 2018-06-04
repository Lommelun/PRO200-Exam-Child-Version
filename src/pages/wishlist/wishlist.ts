import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import algoliasearch from 'algoliasearch';
import * as env from '../../env'


@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})

export class WishlistPage {

  constructor(public angularfirestore: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {

  }

  goToStore(child?) {

    if (child) {
      this.navCtrl.setRoot('StorePage', { child: child });
    } else {
      this.navCtrl.setRoot('StorePage');
    }

  }

}
