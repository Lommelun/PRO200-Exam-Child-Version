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

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  addDocToColl(data: {}, collection: string) {
    this.af.collection(collection).add(data);
  }

  getItemsFromFamily(familyID: string): Observable<Item[]> {
    return this.af.collection('families').doc(familyID).collection<Item>('wishlist')
      .valueChanges();
  }

  getItemFromObjectID(id: string): Observable<DocumentSnapshot> {
    return Observable.fromPromise(this.af.firestore.collection("Marketplace").doc(id).get());
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

  getChild(token: string): Observable<Child> {
    return Observable.fromPromise(
      this.getItemByField('children', 'token', token))
      .map(data => data.docs.find(doc => doc.data().token == token).data() as Child);
  }

  getItemByField(collection: string, field: string, value: any): Promise<QuerySnapshot> {
    return this.af.collection(collection).ref.where(field, '==', value).get();
  }


  addItemToWishlist(familyId: string, item: Item) {
    item.status = "venter"
    item.childToken = JSON.parse(localStorage.getItem(`user`))[`token`];
    this.dataColl = this.af.collection(`families`);
    this.dataColl.doc(familyId).collection(`wishlist`).doc(item.id).set(item);


  }
  addItemToUser(familyId, item: Item) {
    this.af.firestore.collection('families').doc(familyId).collection('wishlist').doc(item.id).get()
      .then(docsnapshot => {

        let user = JSON.parse(localStorage.getItem(`user`))
        console.log(user[`name`])
        console.log(user[`token`])

        if (docsnapshot.exists && user[`token`] === item.childToken) {
          this.toast.create({
            duration: 1500,
            message: 'Du har allerede ønsket denne varen',
            position: 'top'
          }).present();
        } else {
          this.addItemToWishlist(familyId, item);
          this.toast.create({
            duration: 1500,
            message: 'Vare lagt til ønskeliste',
            position: 'top'
          }).present();
        }
      })
  }

  getItemswishedByUser(familyID: string, token: any) {
    this.dataColl = this.af.collection('families').doc(familyID).collection('wishlist')
    var query = this.dataColl.ref.where('childToken', '==', token);
    return Observable.fromPromise(query.get().then(querysnapshot => {
      return querysnapshot.docs.map(documentSnapshot => {
        return documentSnapshot.data() as Item;
      });
    }));
  }

}