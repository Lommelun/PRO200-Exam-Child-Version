import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoryOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-overview',
  templateUrl: 'category-overview.html',
})
export class CategoryOverviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

<<<<<<< HEAD:src/pages/category-overview/category-overview.ts
  getCategory(): string{
    return;
=======
>>>>>>> df3a19f91a48b475b396afb37b92a7bdc9ca660e:src/pages/home/home.ts
  }

  goToStore(child?) {
    
    if (child) {
      this.navCtrl.setRoot('StorePage', { child: child });
    } else {
      this.navCtrl.setRoot('StorePage');
    }

  }
}
