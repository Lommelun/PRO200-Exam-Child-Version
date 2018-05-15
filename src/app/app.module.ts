import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
<<<<<<< HEAD
=======
import { HomePage } from '../pages/home/home';

import env from '../env';
<<<<<<< HEAD
>>>>>>> df3a19f91a48b475b396afb37b92a7bdc9ca660e
=======
>>>>>>> df3a19f91a48b475b396afb37b92a7bdc9ca660e
import { DatabaseProvider } from '../providers/database/database';

@NgModule({
  declarations: [
<<<<<<< HEAD
    MyApp    
=======
    MyApp,
    HomePage
<<<<<<< HEAD
>>>>>>> df3a19f91a48b475b396afb37b92a7bdc9ca660e
=======
>>>>>>> df3a19f91a48b475b396afb37b92a7bdc9ca660e
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(env),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    BarcodeScanner
  ]
})
export class AppModule {}