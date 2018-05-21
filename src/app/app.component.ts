import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'Tab';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private af: AngularFirestore) {
    platform.ready().then(() => {
      af.app.auth().onAuthStateChanged(user => {
        this.rootPage = user ? 'Tab' : 'Tab';


      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

