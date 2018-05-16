import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'
import { QuerySnapshot } from '@firebase/firestore-types';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  dataColl: AngularFirestoreCollection<any>;

  constructor(public http: HttpClient, private af: AngularFirestore) {
    console.log('Hello DatabaseProvider Provider');
  }
  getCurrentUser(): User {
    return this.af.app.auth().currentUser;
  }
  addDocToColl(data: any, collection: string) {
    this.af.collection(collection).add(data);
  }

  getDataFromColl(collection: string) {

    let data: Observable<Object[]>

    this.dataColl = this.af.collection(collection)

    data = this.dataColl.snapshotChanges().
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data }
      }))

    return data;

  }

  getFamily(token: string): Observable<any> {

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

}

  /*
  Navn,
  FamilieId,
  BarneIDer
  
  */

