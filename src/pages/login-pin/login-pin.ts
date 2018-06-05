import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, ToastController } from 'ionic-angular';
import { Child } from '../../models/child';
import { Keyboard } from '@ionic-native/keyboard';
import { Observable, Subscription } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-login-pin',
  templateUrl: 'login-pin.html',
})

export class LoginPinPage {
  @ViewChild('inputToFocus') inputToFocus;
  child: Child;
  pinInput: number;
  private ifLock: boolean = false;
  pin = new Subject<number>();
  pin$ = this.pin.asObservable();
  subscription: Subscription;

  pin_1 = 'radio-button-off';
  pin_2 = 'radio-button-off';
  pin_3 = 'radio-button-off';
  pin_4 = 'radio-button-off';

  constructor(public keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController) {

    this.child = this.navParams.get("child");
    if (this.child == null) this.child = { age: 0, name: '', tag: 'child', pin: '1234' }
    const eventCheck$ = Observable.fromEvent(document, 'onclick')
      .debounceTime(200).subscribe(() => this.pinCheck());
  }
  ionViewDidEnter() {
    this.ifLock = false;
  }


  ionViewDidLoad() {
  this.openKeyboard();
}
    

  openKeyboard(){
    setTimeout(() => {
      this.inputToFocus.setFocus();
      this.keyboard.show();
    }, 400)
  }
  pinCheck() {
    this.pin.next(this.pinInput);
    this.subscription = this.pin$
      .map(pin => (pin != null) ? pin.toString() : '')
      .subscribe(pin => {
        this.updatePinDisplay(pin);
        if (pin.length > 3) this.verifyPin(pin);
      });
  }

  verifyPin(pin: string) {
    (pin == this.child.pin) ? this.login() : this.showPinFailMessage();
  }

  login() {
    this.subscription.unsubscribe();
    if (!this.ifLock) {
      this.ifLock = !this.ifLock
      this.navCtrl.push('Tab');
    }
  }

  reset() {
    this.pinInput = null;
    this.pin.next(this.pinInput);
    this.updatePinDisplay('');
  }

  updatePinDisplay(pin: string) {
    switch (pin.length) {
      case 4: { this.pin_4 = 'radio-button-on'; this.pin_3 = 'radio-button-on'; this.pin_2 = 'radio-button-on'; this.pin_1 = 'radio-button-on'; break; }
      case 3: { this.pin_4 = 'radio-button-off'; this.pin_3 = 'radio-button-on'; this.pin_2 = 'radio-button-on'; this.pin_1 = 'radio-button-on'; break; }
      case 2: { this.pin_4 = 'radio-button-off'; this.pin_3 = 'radio-button-off'; this.pin_2 = 'radio-button-on'; this.pin_1 = 'radio-button-on'; break; }
      case 1: { this.pin_4 = 'radio-button-off'; this.pin_3 = 'radio-button-off'; this.pin_2 = 'radio-button-off'; this.pin_1 = 'radio-button-on'; break; }
      case 0: { this.pin_4 = 'radio-button-off'; this.pin_3 = 'radio-button-off'; this.pin_2 = 'radio-button-off'; this.pin_1 = 'radio-button-off'; break; }
    }
  }

  showPinFailMessage() {
    if (!this.ifLock) {
    this.ifLock = !this.ifLock
      this.toast.create({
        duration: 2000,
        position: 'top',
        message: 'Feil pinkode'
      }).present();
      this.reset();
    }
  }

}
