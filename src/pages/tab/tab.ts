import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatabaseProvider } from '../../providers/database/database';
import { DocumentData } from '@firebase/firestore-types';
import { Item } from '../../models/item';

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
    public db: DatabaseProvider) { }

  async getBarScan() {
    await this.barcodeScanner.scan().then(barcodeData => this.barcode = barcodeData.text);
    await this.getItemByBarcode();
    this.navCtrl.push('ItemDetailPage', { 'item': this.item })
  }

  getItemByBarcode() {
    return this.db.getItemByField('Marketplace', 'EAN', this.barcode)
      .then(result => result.docs
        .forEach(doc => {
          console.log('itembybarc: ', doc.data());
          if (doc.data().EAN == this.barcode) {
            this.item = doc.data() as Item;
            console.log('here')
          }
        }));
  }

}
