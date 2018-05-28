import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPinPage } from './login-pin';

@NgModule({
  declarations: [
    LoginPinPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPinPage),
  ],
})
export class LoginPinPageModule {}
