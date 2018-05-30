import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import algoliasearch from 'algoliasearch';
import * as env from '../../env'


@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})

export class WishlistPage {

  constructor(public angularfirestore: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {

  }

  goToStore(child?) {

    if (child) {
      this.navCtrl.setRoot('StorePage', { child: child });
    } else {
      this.navCtrl.setRoot('StorePage');
    }

  }

  fbToAlgolia() {
    let arr = [];
    this.angularfirestore.collection('Marketplace').ref.get().then((docs) => {
      docs.forEach((doc) => {

        let user = doc.data();
        user.objectID = doc.id;
        arr.push(user);
      })

      let client = algoliasearch(env.algolia.ALGOLIA_APP_ID, env.algolia.ALGOLIA_ADMIN_KEY)
      let index = client.initIndex(env.algolia.ALGOLIA_INDEX_NAME);
      index.saveObjects(arr);
    })
  }
}
