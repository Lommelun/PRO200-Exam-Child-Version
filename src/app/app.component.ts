import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'CategoryOverviewPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private af: AngularFireAuth) {
    this.rootPage = (localStorage.getItem('child')) ? 'Tab' : 'RegisterPage';
    platform.ready().then(() => {
<<<<<<< HEAD
=======
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
>>>>>>> d85e80bd4ad4f21149371a7d7267beb15b8294e8
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

