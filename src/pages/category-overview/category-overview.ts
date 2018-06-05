import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { isTrueProperty } from 'ionic-angular/util/util';
import { QueryDocumentSnapshot, DocumentData, QuerySnapshot } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Rx';
import { Item } from '../../models/item';
import * as _ from 'lodash'

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
<<<<<<< HEAD
        .map(item => item.data())
        .toArray().filter((item) =>{
          const limits = JSON.parse(localStorage.getItem(`user`))[`limits`];
          return limits ?

             _.some(_.keys(item), k => {
              return !_.includes(limits.map(lim => _.upperCase(lim)), _.upperCase(item[k]));
            }) : true;
          }));
        }
=======
        .map(item => { return { 'id': item.id, ...item.data() } as Item })
        .toArray());
  }
>>>>>>> d3844100e61a491e7a31cd36cc003d20899f203a

  pushToDetailPage(item: Item) {
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }
}
