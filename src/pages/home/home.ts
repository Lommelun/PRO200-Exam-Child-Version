import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as env from '../../env';
import { Item } from '../../models/item';
import * as _ from  'lodash';
import { DatabaseProvider } from '../../providers/database/database';
import { Child } from '../../models/child';

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

  constructor(public navCtrl: NavController, public navParams: NavParams , private db: DatabaseProvider) {
    this.client = algoliasearch(env.algolia.ALGOLIA_APP_ID, env.algolia.ALGOLIA_SEARCH_KEY, { protocol: 'https:' });
    this.index = this.client.initIndex("Marketplace");
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  search() {
    this.index
      .search({ query: this.searchQuery })
      .then((data) => this.items = data.hits.filter((item:{}) =>{

        const user = JSON.parse(localStorage.getItem(`user`));
       

        return user ?
           _.some(_.keys(user[`limits`]), k => {
            console.log(k)
            console.log("YO WE SEARCHING BOIS",user[`limits`][k])

            console.log(_.toArray(item))
            
            return !_.includes(_.upperCase(_.toArray(item)), _.upperCase(user[`limits`][k]));

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
  
  addItemToWishlist(item: any) {
    this.db.getItemFromObjectID(item.objectID)
      .subscribe(item => this.db.addItemToUser(this.user.familyId, { 'id' : item.id, ...item.data() } as Item ));
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
