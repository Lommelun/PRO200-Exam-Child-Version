import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class Tab {
  tab1 = 'CategoryOverviewPage';
  tab2 = 'WishlistPage';

  constructor(public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {
    {

    }

  }
  getBarScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
