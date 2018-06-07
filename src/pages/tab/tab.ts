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

  getBarScan() {
    console.log("hello")
    this.barcodeScanner.scan().then((barcodeData) => {
      this.barcode = barcodeData.text;
      console.log(this.barcode)
    }).then(() => this.getItemByBarcode()).catch(e=>console.log(e));





  }


  getItemByBarcode() {

    if (this.barcode) {
      return this.db.getItemByField('Marketplace', 'EAN', this.barcode)

        .then((result) => {

          if(result.docs){
          result.docs
            .forEach(doc => {

              console.log("FINDING")

              if (doc.data().EAN == this.barcode) {
                this.item = doc.data() as Item;
                this.navCtrl.push('ItemDetailPage', { 'item': this.item });

              }
            })
          }else{
            this.toast.create({
              message:'Vi har dessverre ikke denne varen',
              duration:2000,
              position: 'top'
            })
          }
        });
    }
  }
}


