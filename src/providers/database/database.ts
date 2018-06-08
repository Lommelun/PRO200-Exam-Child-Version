import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash'
import { QuerySnapshot } from '@firebase/firestore-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { Child } from '../../models/child';
import { Item } from '../../models/item';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { Toast, ToastController } from 'ionic-angular';
import { DocumentData } from '@firebase/firestore-types';
import { ObservableLike } from 'rxjs';

@Injectable()
export class DatabaseProvider {
  dataColl: AngularFirestoreCollection<{}>;
  user: Child;
  items: Observable<DocumentData[]>;

  constructor(private toast: ToastController,
    public http: HttpClient,
    private af: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getCurrentUser(): Promise<Child> {
    return this.af.collection('children')
      .doc(this.user.id).ref.get().then(result => {
        return (result.exists) ? result.data() as Child : null
      });
  }

  addDocToColl(data: {}, collection: string) {
    this.af.collection(collection).add(data);
  }

  getItemsFromFamily(familyID: string): Observable<Item[]> {
    console.log(familyID)
    return this.af.collection('families').doc(familyID).collection<Item>('wishlist')
      .valueChanges();
  }

  getItemFromObjectID(id: string): Promise<Item> {
    return this.af.collection('Marketplace').doc<Item>(id).ref.get().then(i => {
      return { 'id': i.id, ...i.data() } as Item;
    });
  }

  getDataFromColl(collection: string) {

    let data: Observable<{}[]>

    this.dataColl = this.af.collection(collection)

    data = this.dataColl.snapshotChanges().
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data }
      }))

    return data;
  }

  getFamily(token: string): Observable<{}> {

    this.dataColl = this.af.collection('families')

    return this.dataColl.snapshotChanges().
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        if (_.includes(data, token)) {
          return { id, ...data };
        }
      }))
  }

  getChildByToken(token: string): Promise<Child> {
    return this.getItemByField('children', 'token', token)
      .then(data => {
        if (!data.empty) {
          let docData = data.docs.find(doc => doc.data().token == token);
          return { ...docData.data(), 'id': docData.id } as Child;
        }
      });
  }

  getItemByField(collection: string, field: string, value: any): Promise<QuerySnapshot> {
    return this.af.collection(collection).ref.where(field, '==', value).get();
  }


  addItemToWishlist(familyId: string, item: Item) {

    item.status = "venter"
  
    item.childToken = JSON.parse(localStorage.getItem(`user`))[`token`];
    this.dataColl = this.af.collection(`families`);
    
    this.dataColl.doc(familyId).collection(`wishlist`)
    
    
    .doc(item.id).set(item);


  }
  addItemToUser(familyId, item: Item) {
    console.log("id" , item.id)
    
    this.af.firestore.collection('families').doc(familyId).collection('wishlist').doc(item.id).get()
      .then(docsnapshot => {

        let user = JSON.parse(localStorage.getItem(`user`))
        console.log(user[`name`])
        console.log(user[`token`])

        if (docsnapshot.exists) {
          this.toast.create({
            duration: 1500,
            message: 'Du har allerede ønsket denne varen',
            position: 'top',
            cssClass: "redToastStyle",

          }).present();
        } else {
          this.addItemToWishlist(familyId, item);
          this.toast.create({
            duration: 1500,
            message: 'Vare lagt til i dine ønsker',
            position: 'top',
            cssClass: "greenToastStyle",
           
          }).present();
        }
      })
  }

  getItemswishedByUser(): Observable<Item[]> {
    if (this.user) {
      return this.getItemsFromFamily(this.user.familyId).switchMap(res =>
        res.filter(i => i[`childToken`] === JSON.parse(localStorage.getItem(`user`))[`token`])).toArray();
    } else {
      return Observable.empty();
    }//ok

  }

}