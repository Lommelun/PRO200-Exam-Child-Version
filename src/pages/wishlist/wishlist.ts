import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

<<<<<<< HEAD:src/pages/wishlist/wishlist.ts
  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
=======
>>>>>>> df3a19f91a48b475b396afb37b92a7bdc9ca660e:src/pages/home/home.ts
  }

  goToStore(child?) {
    
    if (child) {
      this.navCtrl.setRoot('StorePage', { child: child });
    } else {
      this.navCtrl.setRoot('StorePage');
    }

  }
}
