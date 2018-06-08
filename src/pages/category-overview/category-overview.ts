import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { isTrueProperty } from 'ionic-angular/util/util';
import { QueryDocumentSnapshot, DocumentData, QuerySnapshot } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Rx';
import { Item } from '../../models/item';
import * as _ from 'lodash'
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-category-overview',
  templateUrl: 'category-overview.html',
})

export class CategoryOverviewPage {
  items: Observable<DocumentData[]>;
  category: string;
  public wishlistItems: Observable<Item[]>;
  public wishlistItems2;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
  private toast: ToastController) {
    this.category = this.navParams.get('type');

    if (!(this.navParams.get('type')=="")) {
      console.log(this.navParams.get('type'))
      this.getItemsByCategory();
    } else {
      this.category = 'Alle varer';
      this.getAllItems();
    }
  }

  ionViewDidLoad() {
   
  }

  getItemsByCategory() {
    console.log('hello');
    Observable.fromPromise(this.db.getItemByField('Marketplace', 'category.' + this.navParams.get('type'), true))
      .subscribe(result => this.items = Observable.from(result.docs)
        .map(item => { return { 'id': item.id, ...item.data() as Item } })
        .toArray().filter((item) => {
          const limits = JSON.parse(localStorage.getItem(`user`))[`limits`];
          return limits ?

            _.some(_.keys(item), k => {
              return !_.includes(limits.map(lim => _.upperCase(lim)), _.upperCase(item[k]));
            }) : true;
        }));
  }
  

  pushToDetailPage(item: Item) {
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }
  getAllItems() {
   this.items = this.db.getDataFromColl(`Marketplace`)
    
  }

  addItemToWishlist(item){
    this.db.addItemToUser(JSON.parse(localStorage.getItem('user'))['familyId'], item);
  }
}

