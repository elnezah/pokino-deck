import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  private static readonly TAG = 'LanguagesComponent';

  @Input() userLanguage: string;
  @Input() voiceSettings: { volume: number; type: string };

  public appLanguages: { code: string; name: string }[];

  public constructor(
    private modalController: ModalController,
    private translate: TranslateService
  ) {}

  public ngOnInit() {
    this.appLanguages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' },
      {
        code: null,
        name: this.translate.instant(
          'SETTINGS.LANGUAGE_VOICE.device_language_name'
        ),
      },
    ];
  }

  public async onClickOnClose(): Promise<void> {
    await this.modalController.dismiss(null, 'cancel');
  }

  public async onClickOnSave(): Promise<void> {
    const result = {
      userLanguage: this.userLanguage,
      voiceSettings: this.voiceSettings,
    };

    await this.modalController.dismiss(result, 'save');
  }
}
