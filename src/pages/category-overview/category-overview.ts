import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { isTrueProperty } from 'ionic-angular/util/util';
import { QueryDocumentSnapshot, DocumentData, QuerySnapshot } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Rx';
import { Item } from '../../models/item';

@IonicPage()
@Component({
  selector: 'page-category-overview',
  templateUrl: 'category-overview.html',
})
export class CategoryOverviewPage {
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
        .map(item => { return { 'id': item.id, ...item.data() } as Item })
        .toArray());
  }

  pushToDetailPage(item: Item) {
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }
}
