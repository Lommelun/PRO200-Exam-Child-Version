import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
<<<<<<< HEAD
import firebase from 'firebase/app';
=======
import Firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
>>>>>>> df3a19f91a48b475b396afb37b92a7bdc9ca660e


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'Tab';

<<<<<<< HEAD
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
=======
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private af:AngularFirestore) {
>>>>>>> df3a19f91a48b475b396afb37b92a7bdc9ca660e

    platform.ready().then(() => {
      af.app.auth().onAuthStateChanged(user=>{
          this.rootPage = user ? 'HomePage' : 'HomePage'


      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

