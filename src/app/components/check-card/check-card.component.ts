import { TranslateService } from '@ngx-translate/core';
import { Card } from './../../shared/card';
import { Deck } from './../../shared/deck';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-check-card',
  templateUrl: './check-card.component.html',
  styleUrls: ['./check-card.component.scss'],
})
export class CheckCardComponent implements OnInit, OnChanges {
  private static readonly TAG = 'CheckCardComponent';

  @Input() deck: Deck;

  public cardsToShow: { card: Card; isPlayed: boolean }[][];

  public constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    this.refresh();
  }

  public ngOnChanges(changes: SimpleChanges): void {}

  private refresh(): void {
    const auxDeck = new Deck(this.translate);
    auxDeck.reset();
    const cardsArray = auxDeck.asCardArray();

    this.cardsToShow = [[]];
    const isPlayed = this.getIsPlayedArray();
    for (let i = 0; i < 10; i++) {
      this.cardsToShow[i] = [];
      for (let j = 0; j < 4; j++) {
        const index = 10 * j + i;
        this.cardsToShow[i][j] = {
          card: cardsArray[index],
          isPlayed: isPlayed[index],
        };
      }
    }

    console.log(CheckCardComponent.TAG, 'ngOnInit pre', {
      auxDeck,
      cts: this.cardsToShow,
    });
  }

  /**
   * Returns an array with 40 booleans, true is the card was already played in this.deck
   */
  private getIsPlayedArray(): boolean[] {
    const res = new Array(40).fill(false);

    if (this.deck) {
      const cards = this.deck.asCardArray();
      for (let i = 0; i <= this.deck.pointer; i++) {
        res[cards[i].id] = true;
      }
    }
    return res;
  }
}
