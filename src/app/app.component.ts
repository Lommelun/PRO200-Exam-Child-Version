import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { Child } from '../models/child';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  user$: Observable<Child>;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private af: AngularFireAuth,
    private afs: AngularFirestore,
    private db: DatabaseProvider) {
    if (this.checkUserLoggedIn()) {
      this.rootPage = 'Tab';
      this.user$ = db.getCurrentUserSnapshot();
    }
    else if (this.checkUsersExist()) { this.rootPage = 'LoginPage' }
    else { this.rootPage = 'RegisterPage' }

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  checkUsersExist(): boolean {
    return (localStorage.getItem('users') != null);
  }

  checkUserLoggedIn(): boolean {
    return (localStorage.getItem('user') != null);
  }
}
