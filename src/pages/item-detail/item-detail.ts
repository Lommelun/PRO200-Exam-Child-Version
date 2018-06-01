import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item';
import { DatabaseProvider } from '../../providers/database/database';
import { firestore } from 'firebase';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  item: Item = {} as Item;
  familyId: string = "RCcqNyACgQZFviHpHSvK";
  constructor(public db: DatabaseProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
  }

  addItemToWishlist() {
    this.db.addItemsToUser(this.familyId, this.item);
  }

}
