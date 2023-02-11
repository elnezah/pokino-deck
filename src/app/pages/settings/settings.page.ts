import { TranslateService } from '@ngx-translate/core';
import {
  DataRepositoryService,
  lsKeyAutoflipTime,
  lsKeyUserLanguage,
  lsKeyVoicePitch,
  lsKeyVoiceSpeed,
  lsKeyVoiceType,
  lsKeyVoiceVolume,
} from './../../services/data-repository.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutoFlipComponent } from 'src/app/modals/settings/auto-flip/auto-flip.component';
import { LanguagesComponent } from 'src/app/modals/settings/languages/languages.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private static readonly TAG = 'SettingsPage';

  public constructor(
    private modalController: ModalController,
    private repo: DataRepositoryService,
    private translate: TranslateService
  ) {}

  public async ngOnInit(): Promise<void> {}

  public async onClickOnAutoFlip() {
    const time = Number.parseInt(
      (await this.repo.localStorageCheck(lsKeyAutoflipTime)).value
    );
    const modal = await this.modalController.create({
      component: AutoFlipComponent,
      componentProps: { time },
    });

    await modal.present();
    const res = await modal.onDidDismiss();

    if (res.role === 'cancel') {
      return;
    }

    this.repo.localStorageSet(lsKeyAutoflipTime, res.data.time.toString());
  }

  public async onClickOnLanguages() {
    const componentProps = {
      userLanguage: (await this.repo.localStorageCheck(lsKeyUserLanguage))
        .value,
      userVoiceType: (await this.repo.localStorageCheck(lsKeyVoiceType)).value,
      userVoiceVolume: (await this.repo.localStorageCheck(lsKeyVoiceVolume))
        .value,
      userVoicePitch: (await this.repo.localStorageCheck(lsKeyVoicePitch))
        .value,
      userVoiceSpeed: (await this.repo.localStorageCheck(lsKeyVoiceSpeed))
        .value,
    };

    const modal = await this.modalController.create({
      component: LanguagesComponent,
      componentProps,
    });

    await modal.present();
    const res = await modal.onDidDismiss();

    // If user cancelled, restore language in use and exit
    if (res.role === 'cancel') {
      await this.translate
        .use(
          (await localStorage.getItem(lsKeyUserLanguage)) ??
            this.translate.getBrowserLang()
        )
        .toPromise();
      return;
    }

    await this.repo.localStorageSet(lsKeyUserLanguage, res.data.userLanguage);
    await this.repo.localStorageSet(
      lsKeyVoiceVolume,
      (res.data.voiceVolume as number).toString()
    );
    await this.repo.localStorageSet(
      lsKeyVoicePitch,
      (res.data.voicePitch as number).toString()
    );
    await this.repo.localStorageSet(
      lsKeyVoiceSpeed,
      (res.data.userVoiceSpeed as number).toString()
    );
    await this.repo.localStorageSet(lsKeyVoiceType, res.data.voiceType);
  }
}
