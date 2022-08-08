import { TranslateService } from '@ngx-translate/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export class Card {
  private static readonly TAG = 'Card';

  public id: number;
  public suit: 'oro' | 'basto' | 'espada' | 'copa';
  public cardNumber: number;

  public constructor(private translate: TranslateService) {}

  public async speak(): Promise<void> {
    if (!this.suit || this.cardNumber == null) {
      return;
    }

    const name =
      this.cardNumber > 1 && this.cardNumber < 10
        ? this.cardNumber.toString()
        : this.translate.instant('CARD.NUMBER.' + this.cardNumber.toString());
    const text = this.translate.instant('CARD.speak_card', {
      card_name: name,
      card_suit: this.translate.instant('CARD.SUITS.' + this.suit),
    });

    const lang = this.translate.currentLang === 'es' ? 'es-ES' : 'en-GB';


    await TextToSpeech.speak({
      text,
      lang,
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
    });
  }
}
