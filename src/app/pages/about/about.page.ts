import { ModalController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  private static readonly TAG = 'AboutPage';

  public appVersionNumber: string;
  public appVersionCode: string | number;

  public constructor(
    private modalController: ModalController,
    private appVersion: AppVersion,
    private platform: Platform
  ) {}

  public async ngOnInit(): Promise<void> {
    if (this.platform.is('cordova')) {
      this.appVersionNumber = await this.appVersion.getVersionNumber();
      this.appVersionCode = await this.appVersion.getVersionCode();
    } else {
      console.warn(AboutPage.TAG, 'Not running on a device');
      this.appVersionNumber = '0.0.0';
      this.appVersionCode = '0';
    }
  }
}
