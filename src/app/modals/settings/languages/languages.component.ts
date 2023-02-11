import { ToolboxService } from './../../../services/toolbox.service';
import { Card } from 'src/app/shared/card';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit, OnChanges {
  private static readonly TAG = 'LanguagesComponent';

  @Input() userLanguage: 'en' | 'es' | null;
  @Input() userVoiceType: string;
  @Input() userVoiceVolume: number;
  @Input() userVoicePitch: number;
  @Input() userVoiceSpeed: number;

  public appLanguages: { code: string; name: string }[];
  public ttsVoicesForUserLang: string[] = [];

  public constructor(
    private modalController: ModalController,
    private toolbox: ToolboxService,
    private translate: TranslateService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.appLanguages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      {
        code: null,
        name: this.translate.instant(
          'SETTINGS.LANGUAGE_VOICE.device_language_name'
        ),
      },
    ];

    await this.refreshVoices();
  }

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {}

  //region Listeners

  public async onUserLanguageChange(): Promise<void> {
    this.translate.use(this.userLanguage);
    await this.refreshVoices();
  }

  public async onClickOnClose(): Promise<void> {
    await this.modalController.dismiss(null, 'cancel');
  }

  public async onClickOnSave(): Promise<void> {
    const result = {
      userLanguage: this.userLanguage,
      voiceType: this.userVoiceType,
      voiceVolume: this.userVoiceVolume,
      voicePitch: this.userVoicePitch,
      userVoiceSpeed: this.userVoiceSpeed,
    };

    await this.modalController.dismiss(result, 'save');
  }

  public async onClickOnTestVoice(): Promise<void> {
    const randomCard = this.toolbox.idToCard(
      Math.floor(Math.random() * 40) + 1
      );

      randomCard.speak(
        this.userVoiceType,
        this.userVoiceSpeed,
        this.userVoicePitch,
        this.userVoiceVolume
      );
  }

  public onVolumeChange($event: Event): void {
    if (!($event instanceof CustomEvent)) {
      return;
    }

    this.userVoiceVolume = $event.detail.value / 10;
  }

  public onVoicePitch($event: Event): void {
    if (!($event instanceof CustomEvent)) {
      return;
    }

    this.userVoicePitch = $event.detail.value / 10;
  }

  public onVoiceSpeed($event: Event): void {
    if (!($event instanceof CustomEvent)) {
      return;
    }

    this.userVoiceSpeed = $event.detail.value / 10;
  }
  //endregion

  private async refreshVoices(): Promise<void> {
    await this.setTtsVoicesForUserLang();

    this.userVoiceType =
      this.ttsVoicesForUserLang.find((e) => e === this.userVoiceType) ??
      this.ttsVoicesForUserLang[0];
  }

  private async setTtsVoicesForUserLang(): Promise<void> {
    const ttsVoices = await TextToSpeech.getSupportedVoices();

    // Select the available languages for the given voice
    this.ttsVoicesForUserLang = ttsVoices.voices.filter((e) =>
      e.voiceURI.startsWith(this.userLanguage)
    ).map(e => e.lang);
    // Remove duplicates
    this.ttsVoicesForUserLang = Array.from(new Set(this.ttsVoicesForUserLang));
  }
}
