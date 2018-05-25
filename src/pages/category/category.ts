import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { isTrueProperty } from 'ionic-angular/util/util';
import { QueryDocumentSnapshot, DocumentData } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Rx';
import { Item } from '../../models/item';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  items: Observable<DocumentData[]>;
  category: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider) {
    this.getItemsByCategory();
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('type'));
  }

  getItemsByCategory() {
    Observable.fromPromise(this.db.getItemByField('Marketplace', 'category.' + this.navParams.get('type'), true))
      .subscribe(result => this.items = Observable.from(result.docs)
        .map(item => item.data())
        .toArray());
  }
  pushToDetailPage(item: Item) {
    console.log(item);
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }
}
