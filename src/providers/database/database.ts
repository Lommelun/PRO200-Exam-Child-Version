import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash'
import { QuerySnapshot } from '@firebase/firestore-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { Child } from '../../models/child';
import { Item } from '../../models/item';
import { DocumentSnapshot } from '@firebase/firestore-types';

@Injectable()
export class DatabaseProvider {
  dataColl: AngularFirestoreCollection<{}>;

  constructor(public http: HttpClient, private af: AngularFirestore, private afAuth: AngularFireAuth) { }

  getCurrentUser(): User {
    return this.afAuth.auth.currentUser;
  }

  addDocToColl(data: {}, collection: string) {
    this.af.collection(collection).add(data);
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

  addItemsToUser(familyId: string, item: Item) {
    this.dataColl = this.af.collection(`families`);
    this.dataColl.doc(familyId).collection(`items`).doc(item.id).set(item);
  }

}
