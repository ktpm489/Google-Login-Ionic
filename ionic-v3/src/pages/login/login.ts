import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public nativeStorage: NativeStorage,
    public googlePlus: GooglePlus) {}

  doGoogleLogin(){
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '137369261727-65j55g1285i62fakcl5327n24gljrrfu.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then((user) => {
      loading.dismiss();

      this.nativeStorage.setItem('user', {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      })
      .then(() => {
        nav.push(UserPage);
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      loading.dismiss();
    });
  }
}
