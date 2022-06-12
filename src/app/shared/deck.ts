import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Card } from './card';

export interface DeckStatus {
  totalCards: number;
  playedCars: number;
  remainingCards: number;
}

const suitsArray = ['oro', 'basto', 'espada', 'copa'];

@Injectable({
  providedIn: 'root',
})
export class Deck {
  private static readonly TAG = 'Deck';

  private deck: number[];
  private _pointer = -1;

  public constructor(private translate: TranslateService) {
    this.deck = Array(40)
      .fill(0)
      .map((e, i) => i);
  }

  public get pointer(): number {
    return this._pointer;
  }

  public get status(): DeckStatus {
    return {
      totalCards: this.deck.length,
      playedCars: this._pointer + 1,
      remainingCards: this.deck.length - (this._pointer + 1),
    };
  }

  /**
   * Shuffles the deck
   */
  public shuffle(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  public drawOne(): Card {
    this._pointer++;
    if (this._pointer >= this.deck.length) {
      this._pointer = this.deck.length - 1;
    }

    return this.idToCard(this.deck[this._pointer]);
  }

  public reset(): void {
    this._pointer = -1;
  }

  public asCardArray(): Card[] {
    return this.deck.map((c) => this.idToCard(c));
  }

  private idToCard(id: number): Card {
    let cardNumber = (id % 10) + 1;
    if (cardNumber > 7) {
      cardNumber += 2;
    }
    const res = new Card(this.translate);
    res.id = id;
    res.suit = suitsArray[Math.floor(id / 10)] as
      | 'oro'
      | 'basto'
      | 'espada'
      | 'copa';
    res.cardNumber = cardNumber;

    return res;
  }
}
