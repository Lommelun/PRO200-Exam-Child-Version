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
<<<<<<< HEAD
  rootPage = 'CategoryOverviewPage';
=======
  rootPage='CategoryOverviewPage';
>>>>>>> 0f9c59bca02045575844462d42f16cebc39d0469

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private af: AngularFireAuth) {
    //this.rootPage = (localStorage.getItem('users')) ? 'LoginPage' : 'RegisterPage';
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

