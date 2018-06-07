import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatabaseProvider } from '../../providers/database/database';
import { DocumentData } from '@firebase/firestore-types';
import { Item } from '../../models/item';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

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
    public barcodeScanner: BarcodeScanner,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
  private toast: ToastController) { }

  async getBarScan() {
    await this.barcodeScanner.scan().then((barcodeData?) => this.barcode = barcodeData.text);
    await this.getItemByBarcode();
    console.log(this.barcode)
    console.log(this.item)
    this.navCtrl.push('ItemDetailPage', { 'item': this.item })
  }


  getItemByBarcode() {
    if (this.barcode) {
      return this.db.getItemByField('Marketplace', 'EAN', this.barcode)
        .then((result) => result.docs
          .forEach(doc => {
            if (doc.data().EAN == this.barcode) {
              this.item = { ...doc.data(), 'id': doc.id } as Item;
            }
          }));
    }
  }
}


