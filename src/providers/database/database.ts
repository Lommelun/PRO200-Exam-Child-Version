import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash'
import { QuerySnapshot } from '@firebase/firestore-types';
import { AngularFireAuth } from 'angularfire2/auth';

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

    this.dataColl = this.af.collection(`Families`)

    return this.dataColl.snapshotChanges().
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        if (_.includes(data, token)) {
          return { id, ...data };
        }
      }))
  }

  getItemByField(collection: string, field: string, value: string): Promise<QuerySnapshot> {
    return this.af.collection(collection).ref.where(field, '==', value).get();
  }

  addItemsToUser(familyId: string, uid: string, item: {}) {

    this.dataColl = this.af.collection(`Families`);

    this.dataColl.doc(familyId).collection(`Items`).doc(uid).set(item);
  }

  getStoreItemsWithCategory(category: string) {

  }

}
