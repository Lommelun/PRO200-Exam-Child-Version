import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item';
import { DatabaseProvider } from '../../providers/database/database';
import { firestore } from 'firebase';
import { Child } from '../../models/child';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import * as _ from 'lodash'
/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  item: Item = {} as Item;
  user:Child;
  
  constructor(public db: DatabaseProvider, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
    this.item = navParams.get('item');
    this.user = navParams.get('user');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  addItemToWishlist(item: Item) {
   
      this.db.addItemToUser(this.user.familyId, this.item);
        this.toast.create({
          message: `Lagt til i dine ønsker!`,
          duration: 2000,
          position: `top`,
          cssClass: `greenToastStyle`,
          showCloseButton: true,
          closeButtonText:"Lukk"
        }).present();
      
      
      }
  }

