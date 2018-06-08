import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatabaseProvider } from '../../providers/database/database';
import { Item } from '../../models/item';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({

  selector: 'page-tab',
  templateUrl: 'tab.html',
})

export class Tab {

  tab1 = 'HomePage';
  tab2 = 'WishlistPage';

  barcode: string = "";
  item: Item;

  constructor(
    private platform:Platform,
    public keyboard: Keyboard,
    public barcodeScanner: BarcodeScanner,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    private toast: ToastController) {
  

  }


  async getBarScan() {
    await this.barcodeScanner.scan().then((barcodeData?) => this.barcode = barcodeData.text);
    await this.getItemByBarcode();
  }


  getItemByBarcode() {

    if (this.barcode) {
      return this.db.getItemByField('Marketplace', 'EAN', this.barcode)

        .then((result) => {

          if (result.docs) {
            result.docs
              .forEach(doc => {

                console.log("FINDING")

                if (doc.data().EAN == this.barcode) {
                  this.item = { ...doc.data(), 'id': doc.id } as Item;
                  this.navCtrl.push('ItemDetailPage', { 'item': this.item });

                }
              })
          } else {
            this.toast.create({
              message: 'Vi har dessverre ikke denne varen',
              duration: 2000,
              position: 'top'
            })
          }
        });
    }
  }
}


