import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatabaseProvider } from '../../providers/database/database';
import { Item } from '../../models/item';
import { Observable } from 'rxjs/Rx';
import { DocumentData } from '@firebase/firestore-types';
import { Child } from '../../models/child';


@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})

export class WishlistPage {
  items;
  user:Child;


  constructor(public db: DatabaseProvider,
    public angularfirestore: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getItemsfromWishlist();
  }

  getItemsfromWishlist() {
    this.db.getItemsFromFamily(this.user.familyId).subscribe(res=> 
      this.items = res.filter(i => i[`childToken`] === JSON.parse(localStorage.getItem(`user`))[`token`]));
  }
  
  
  pushToDetailPage(item: Item) {
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }

}



