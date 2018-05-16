import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatabaseProvider } from '../../providers/database/database';
import { DocumentData } from '@firebase/firestore-types';

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class Tab {
  tab1 = 'CategoryOverviewPage';
  tab2 = 'WishlistPage';

  barcode: string = "";
  item: DocumentData;

  constructor(
    public barcodeScanner: BarcodeScanner,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider) { }

  getBarScan() {
    this.barcodeScanner.scan()
      .then(barcodeData => this.barcode = barcodeData.text)
      .then(() => this.item = this.getItemByBarcode())
      .then(() => {
        let item = this.item;
        this.navCtrl.push('ItemDetails', { item })
      })
      .catch(err => console.error('Error', err));
  }

  getItemByBarcode() {
    let item;
    this.db.getItemByField('items', 'EAN', this.barcode)
      .then(result => result.docs
        .forEach(doc => {
          if (doc.data().EAN == this.barcode) {
            item = doc.data();
          }
        }));
    return item;
  }

}
