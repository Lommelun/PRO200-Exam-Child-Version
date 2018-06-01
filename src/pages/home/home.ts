import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as algoliasearch from 'algoliasearch'
import * as env from '../../env'
import { Item } from '../../models/item';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  client: any;
  index: any;
  ALGOLIA_APP_ID: string = env.algolia.ALGOLIA_APP_ID
  ALGOLIA_API_KEY: string = env.algolia.ALGOLIA_SEARCH_KEY
  searchQuery: string = "";
  items: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = algoliasearch(this.ALGOLIA_APP_ID, this.ALGOLIA_API_KEY, { protocol: 'https:' });
    this.index = this.client.initIndex("Marketplace")
  }

  search(event) {
    this.index.search({
      query: this.searchQuery
    }).then((data) => {
      console.log(data.hits)
      this.items = data.hits;

    })
  }

  getCategory(cat: string) {
    console.log(cat);
    this.navCtrl.push('CategoryOverviewPage', { 'type': cat });
  }

  goToStore(child?) {

    if (child) {
      this.navCtrl.setRoot('StorePage', { child: child });
    } else {
      this.navCtrl.setRoot('StorePage');
    }

  }
  pushWishlistPage() {
    this.navCtrl.push('WishlistPage');
  }
  pushToDetailPage(item: Item) {
    console.log(item);
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }
}
