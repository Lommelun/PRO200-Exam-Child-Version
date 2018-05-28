import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput } from 'ionic-angular';
import { Child } from '../../models/child';
import { Keyboard } from '@ionic-native/keyboard';
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-login-pin',
  templateUrl: 'login-pin.html',
})

export class LoginPinPage {
  @ViewChild('inputToFocus') inputToFocus;
  child: Child = {} as Child;
  pin: number;
   

  constructor(public keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.child = this.navParams.get("child");
    const eventCheck$ = Observable.fromEvent(document, 'onclick')
      .debounceTime(200).subscribe(() => this.pinCheck());
  }
  ionViewDidLoad() {

    setTimeout(() => {
      this.inputToFocus.setFocus();
      this.keyboard.show();
    }, 400)
  }

  pinCheck() {
    let pin: string = this.pin.toString();
    if (pin.length > 3) {
      console.log(pin)
      this.child.pin = "1234";
      if(pin == this.child.pin){
        this.navCtrl.push('CategoryOverviewPage');
      }
    }
    else{
      this.pin = null;
    }
  }

}
