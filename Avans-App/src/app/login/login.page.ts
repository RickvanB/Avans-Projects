import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {AppLaunchUrl, AppUrlOpen, Plugins, registerWebPlugin} from '@capacitor/core';
import {environment} from '../../environments/environment';
import {OAuth2Client} from '@daanvanberkel/capacitor-oauth2';

const { App } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
      private authService: AuthService,
      private router: Router,
      private platform: Platform
  ) { }

  ngOnInit() {
    if (this.authService.getAccessToken()) {
      this.router.navigate(['/home']);
      return;
    }

    if (this.isAndroid()) {
      // Handle Deep Links on android
      App.addListener('appUrlOpen', data => this.handleOpenUrl(data));
      App.getLaunchUrl().then(data => this.handleOpenUrl(data));
    }

    // Register OAuth2client plugin with Capacitor
    registerWebPlugin(OAuth2Client);
  }

  startAuthentication() {
    const url = new URL(window.location.href);

    // Handle authentication
    Plugins.OAuth2Client.authenticate({
      authorizationBaseUrl: `${environment.api_base}/auth/avans`,
      responseType: 'token',
      web: {
        appId: this.isAndroid() ? 'speedmeetand' : 'speedmeetweb',
        redirectUrl: `${url.protocol}//${url.host}/callback`
      },
      android: {
        appId: 'speedmeetand',
        redirectUrl: 'nl.avans.speedmeet:/'
      },
      ios: {
        appId: 'speedmeetios',
        redirectUrl: 'nl.avans.speedmeet:/'
      }
    }).then(response => {
      if (response.access_token) {
        this.authService.setAccessToken(response.access_token);
        this.router.navigate(['/home']);
      }
    }).catch(err => console.log('Error', err));
  }

  private handleOpenUrl(data: AppUrlOpen|AppLaunchUrl): void {
    if (!data.url) {
      return;
    }

    const openUrl = new URL(data.url);
    if (openUrl.searchParams.has('access_token')) {
      this.authService.setAccessToken(openUrl.searchParams.get('access_token'));
      this.router.navigate(['/home']);
    }
  }

  private isAndroid(): boolean {
    const platforms = this.platform.platforms();
    return (platforms.indexOf('android') > -1);
  }
}
