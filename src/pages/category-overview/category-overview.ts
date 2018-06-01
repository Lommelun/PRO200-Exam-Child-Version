import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as algoliasearch from 'algoliasearch'
import * as env from '../../env'
import { Item } from '../../models/item';
import { DatabaseProvider } from '../../providers/database/database';


/**
 * Generated class for the CategoryOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-overview',
  templateUrl: 'category-overview.html',
})
export class CategoryOverviewPage {

  client: any;
  index: any;
  ALGOLIA_APP_ID: string = env.algolia.ALGOLIA_APP_ID
  ALGOLIA_API_KEY: string = env.algolia.ALGOLIA_SEARCH_KEY
  searchQuery: string = "";
  items = [];
  familyId: string = "RCcqNyACgQZFviHpHSvK";


  constructor(public db: DatabaseProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.client = algoliasearch(this.ALGOLIA_APP_ID, this.ALGOLIA_API_KEY, { protocol: 'https:' });
    this.index = this.client.initIndex("Marketplace")
  }

  search(event) {
    this.index.search({
      query: this.searchQuery
    }).then((data) => {
      this.items = data.hits;
    })
  }

  addItemToWishlist(item: any) {
    this.db.getItemFromObjectID(item.objectID)
      .subscribe(item => this.db.addItemsToUser(this.familyId, { 'id' : item.id, ...item.data() } as Item ));
  }
  
  getCategory(cat: string) {
    console.log(cat);
    this.navCtrl.push('CategoryPage', { 'type': cat });
  }

  goToStore(child?) {

    if (child) {
      this.navCtrl.setRoot('StorePage', { child: child });
    } else {
      this.navCtrl.setRoot('StorePage');
    }
  }

  pushToDetailPage(item: Item) {
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }
}
