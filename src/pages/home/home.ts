import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as env from '../../env';
import { Item } from '../../models/item';
import * as _ from 'lodash';
import { DatabaseProvider } from '../../providers/database/database';
import { Child } from '../../models/child';
import { Observable } from 'rxjs/Rx';
import { DocumentData, DocumentSnapshot } from '@firebase/firestore-types';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private client: algoliasearch.Client;
  private index: algoliasearch.Index;
  public searchQuery: string = "";
  public items: any[] = [];
  private user: Child;
  public wishlistItems: Observable<Item[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {
    this.client = algoliasearch(env.algolia.ALGOLIA_APP_ID, env.algolia.ALGOLIA_SEARCH_KEY, { protocol: 'https:' });
    this.index = this.client.initIndex("Marketplace");
    this.user = JSON.parse(localStorage.getItem('user')); 
    this.wishlistItems = this.db.getItemswishedByUser(this.user.familyId, this.user)
    console.log(this.wishlistItems)
    console.log(this.db.getItemsFromFamily)

  }

  search() {
    this.index
    .search({ query: this.searchQuery })
    .then((data) => this.items = data.hits.filter((item: {}) => {

      const user = JSON.parse(localStorage.getItem(`user`));


      return user[`limits`] ?
        _.some(_.keys(user[`limits`]), k => {
         
        

          return !_.includes(_.upperCase(_.toArray(item)), _.upperCase(user[`limits`][k]));

        }) : true;
    }));
    

  }
  checkIfSearchItemsAreOnWishlist() {
    this.index
    .search({ query: this.searchQuery })
    .then((data) => this.items = data.hits.filter((item: {}) => {


      return this.wishlistItems ?
        _.some(_.keys(this.wishlistItems), k => {
         this.wishlistItems[k]['EAN']
         console.log('key',k)
         console.log('her',this.wishlistItems[k]['EAN'])

          return _.includes(_.upperCase(_.toArray(item)), _.upperCase(this.wishlistItems[k]));

        }) : true;
    }));
  }

  getCategory(cat: string) {
    this.navCtrl.push('CategoryOverviewPage', { 'type': cat });
  }

  goToStore(child?) {
    if (child) {
      this.navCtrl.setRoot('StorePage', { 'child': child });
    } else {
      this.navCtrl.setRoot('StorePage');
    }
  }

  pushWishlistPage() {
    this.navCtrl.push('WishlistPage');
  }

  addItemToWishlist(item: any) {
    this.db.getItemFromObjectID(item.objectID)
      .subscribe(item => this.db.addItemToUser(this.user.familyId, { 'id': item.id, ...item.data() } as Item));
  }

  pushToDetailPage(item: Item) {
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.navCtrl.setRoot('LoginPage');
    this.navCtrl.popToRoot();
  }


}
