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
  public wishlistItems2;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private db: DatabaseProvider) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.init();
    this.wishlistItems = this.db.getItemswishedByUser();


  }
  async init() {
    this.client = await algoliasearch(env.algolia.ALGOLIA_APP_ID, env.algolia.ALGOLIA_SEARCH_KEY, { protocol: 'https:' });
    this.index = await this.client.initIndex("Marketplace");

    if (this.user && this.user.familyId) {
      this.wishlistItems2 = this.db.getItemsFromFamily(this.user.familyId);
    }
  }
  search() {
    this.index
      .search({ query: this.searchQuery })
      .then((data) => this.items = data.hits.filter( (item: {}) => {

        const user = JSON.parse(localStorage.getItem(`user`));

        return user[`limits`] ?
          _.some(_.keys(user[`limits`]), k => {



            return !_.includes(_.upperCase(_.toArray(item)), _.upperCase(user[`limits`][k]));

          }) : true;
      })).then(()=> this.checkIfSearchItemsAreOnWishlist());
  
  }

  checkIfSearchItemsAreOnWishlist() {
    this.init();
    this.wishlistItems2.subscribe(res => {

      const wishListArr = res.filter(i => i[`childToken`] === JSON.parse(localStorage.getItem(`user`))[`token`])
      console.log("YO", res)

      this.index
        .search({ query: this.searchQuery })

        .then((data) => data.hits.filter((item) => {
          console.log("YO");
          return res ?

            _.some(_.keys(wishListArr), k => {

              res.forEach(item => {
                if (item[`EAN`] === wishListArr[k][`EAN`])
                  this.items.forEach(e => {
                    if (e[`EAN`] === item[`EAN`]) {
                      //  DO SOMETHING WITH IT 
                      e[`wish`] = true;

                    }
                  })
              });

            }) : true;
        })
        )
    })
  }

  getCategory(cat: string) {
    this.navCtrl.push('CategoryOverviewPage', { 'type': cat });
  }

  pushWishlistPage() {
    this.navCtrl.push('WishlistPage');
  }

  addItemToWishlist(item: any) {
    this.db.getItemFromObjectID(item.objectID)
      .then(item => this.db.addItemToUser(this.user.familyId, item));
  }

  pushToDetailPage(item: any) {
    this.db.getItemFromObjectID(item.objectID)
      .then(item => this.navCtrl.push('ItemDetailPage', { 'item': item }));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.navCtrl.setRoot('LoginPage');
    this.navCtrl.popToRoot();
  }

  getStyle(item) {
    return item[`wish`] ? { "background-color": "lightgrey" } : {};
  }
}
