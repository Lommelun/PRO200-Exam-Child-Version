import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as env from '../../env';
import { Item } from '../../models/item';
import * as _ from  'lodash'

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = algoliasearch(env.algolia.ALGOLIA_APP_ID, env.algolia.ALGOLIA_SEARCH_KEY, { protocol: 'https:' });
    this.index = this.client.initIndex("Marketplace");
  }

  search() {
    this.index
      .search({ query: this.searchQuery })
      .then((data) => this.items = data.hits.filter((item:{}) =>{

        const user = JSON.parse(localStorage.getItem(`user`));
        console.log(user)

        return (user !== null) || user ?
           _.some(_.keys(item), k => {
            return !_.includes(_.upperCase(user[`limits`]), _.upperCase(item[k]));
          }): true;

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

  pushToDetailPage(item: Item) {
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.navCtrl.setRoot('LoginPage');
    this.navCtrl.popToRoot();
  }

}
