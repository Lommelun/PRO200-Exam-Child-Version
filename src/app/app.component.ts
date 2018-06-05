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
  rootPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private af: AngularFireAuth) {
    if (this.checkUserLoggedIn()) { this.rootPage = 'Tab' }
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

