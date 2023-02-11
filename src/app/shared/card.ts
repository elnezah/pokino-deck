import { TranslateService } from '@ngx-translate/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export type Suit = 'oro' | 'basto' | 'espada' | 'copa';

export class Card {
  private static readonly TAG = 'Card';

  public id: number;
  public suit: Suit;
  public cardNumber: number;

  public constructor(private translate: TranslateService) {}

  public async speak(lang?: string, rate = 1, pitch = 1, volume = 1): Promise<void> {
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

    // Select user preferred voice type, if none, infer from current language
    if (!lang) {
      lang = this.translate.currentLang === 'es' ? 'es-ES' : 'en-GB';
    }

    await TextToSpeech.speak({
      text,
      lang,
      rate,
      pitch,
      volume,
      category: 'ambient',
    });
  }
}
