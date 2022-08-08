import {
  DataRepositoryService,
  lsKeyAutoflipTime,
  lsKeyUserLanguage,
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
    private repo: DataRepositoryService
  ) {}

  public async ngOnInit(): Promise<void> {}

  public async onClickOnAutoFlip() {
    const modal = await this.modalController.create({
      component: AutoFlipComponent,
      componentProps: {
        time: Number.parseInt(
          await (
            await this.repo.localStorageCheck(lsKeyAutoflipTime)
          ).value
        ),
      },
    });

    await modal.present();
    const res = await modal.onDidDismiss();

    if (res.role === 'cancel') {
      return;
    }

    this.repo.localStorageSet(lsKeyAutoflipTime, res.data.time);
  }

  public async onClickOnLanguages() {
    const modal = await this.modalController.create({
      component: LanguagesComponent,
      componentProps: {
        userLanguage: await this.repo.localStorageCheck(lsKeyUserLanguage),
        voiceSettings: {
          volume: await this.repo.localStorageCheck(lsKeyVoiceVolume),
          type: await this.repo.localStorageCheck(lsKeyVoiceType),
        },
      },
    });

    await modal.present();
    const res = await modal.onDidDismiss();

    if (res.role === 'cancel') {
      return;
    }

    console.log(SettingsPage.TAG, 'onClickOnLanguages', { res });

    await this.repo.localStorageSet(lsKeyUserLanguage, res.data.userLanguage);
    await this.repo.localStorageSet(
      lsKeyVoiceVolume,
      res.data.voiceSettings.volume.value
    );
    await this.repo.localStorageSet(
      lsKeyVoiceType,
      res.data.voiceSettings.type.value
    );
  }
}
