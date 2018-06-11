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
  items: Item[] = [];
  category: string;
  public wishlistItems: Observable<Item[]>;
  public wishlistItems2;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    private toast: ToastController) {
      this.category = this.navParams.get('type');

    if (!(this.navParams.get('type') == "")) {
      console.log(this.navParams.get('type'))
      this.getItemsByCategory();
    } else {
      this.category = 'Alle varer';
      this.getAllItems();
    }
  }


  getItemsByCategory() {

    Observable.fromPromise(this.db.getItemByField('Marketplace', 'category.' + this.navParams.get('type'), true))
      .subscribe(result => {

        
        result.docs
          .map(item => {
            
            this.items.push({ 'id': item.id, ...item.data() as Item })
            

            return { 'id': item.id, ...item.data() as Item }
          })
          .filter((item) => {
            const limits = JSON.parse(localStorage.getItem(`user`))[`limits`];

            return limits ?

              _.some(_.keys(item), k => {
                return !_.includes(limits.map(lim => _.upperCase(lim)), _.upperCase(item[k]));
              }) : true;

          })

        const user = JSON.parse(localStorage.getItem(`user`));

        this.db.getItemsFromFamily(user.familyId).subscribe(res => {


          const wishListArr = res.filter(i => i[`childToken`] === JSON.parse(localStorage.getItem(`user`))[`token`])
          
          let counter = 0;
          wishListArr.forEach((item2) => {
          this.items.forEach((item1) => {
              
                if (item1[`EAN`] === wishListArr[counter][`EAN`]) {

                  item1[`wish`] = true;

                }
            
              if (counter === wishListArr.length) {
                return;
              }
            })
            counter++
          });

        })
      })



  }

  pushToDetailPage(item: Item) {
    this.navCtrl.push('ItemDetailPage', { 'item': item });
  }
  getAllItems() {
    this.db.getDataFromColl(`Marketplace`).subscribe(res => {
      this.items = res as Item[];
    })

  }

  addItemToWishlist(item) {
    
    this.db.addItemToWishlist(JSON.parse(localStorage.getItem('user'))['familyId'], item);
    this.toast.create({
      message: ` ${item.name} er lagt til i dine ønsker!`,
      duration: 2000,
      position: `top`,
      cssClass: `greenToastStyle`,

    }).present();

  }
  getStyle(item) {
    
    return item[`wish`] ? { "background-color": "lightgrey" } : {};
  }
}




