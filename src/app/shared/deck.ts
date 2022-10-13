import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Card, Suit } from './card';

export interface DeckStatus {
  totalCards: number;
  playedCars: number;
  remainingCards: number;
}

export interface DeckRestoreObject {
  cardsArray: number[];
  pointer: number;
}

const suitsArray: Suit[] = ['oro', 'basto', 'espada', 'copa'];

@Injectable({
  providedIn: 'root',
})
export class Deck {
  private static readonly TAG = 'Deck';

  private cardsArray: number[];
  private _pointer = -1;

  public constructor(private translate: TranslateService) {
    this.cardsArray = Array(40)
      .fill(0)
      .map((e, i) => i);
  }

  public get pointer(): number {
    return this._pointer;
  }

  public get status(): DeckStatus {
    return {
      totalCards: this.cardsArray.length,
      playedCars: this._pointer + 1,
      remainingCards: this.cardsArray.length - (this._pointer + 1),
    };
  }

  /**
   * Shuffles and resets the deck
   */
  public shuffle(): void {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cardsArray[i], this.cardsArray[j]] = [
        this.cardsArray[j],
        this.cardsArray[i],
      ];
    }
    this.restart();
  }

  /**
   * Moves the pointer one forward and returns the played card
   * @returns the played card
   */
  public drawOne(): Card {
    this._pointer++;
    if (this._pointer >= this.cardsArray.length) {
      this._pointer = this.cardsArray.length - 1;
    }

    return this.idToCard(this.cardsArray[this._pointer]);
  }

  /**
   * Resets the deck pointer, does not affect the deck order
   */
  public restart(): void {
    this._pointer = -1;
  }

  /**
   * Reset the deck pointer and sort the cards
   */
  public reset(): void {
    this.cardsArray = new Array(40).fill(null).map((e, i) => i);
    this._pointer = -1;
  }

  public getCurrentCard(): Card {
    return this.idToCard(this.cardsArray[this._pointer]);
  }

  /** Returns an object from which you can later restore the deck with the function restoreDeck */
  public getRestoreObject(): DeckRestoreObject {
    return {
      cardsArray: this.cardsArray,
      pointer: this._pointer,
    };
  }

  /** Restores the deck to the status given by the restore object parameter. Will overwrite current deck completely. */
  public restoreDeck(restoreObject: DeckRestoreObject): boolean {
    if (this.pointer >= this.cardsArray.length) {
      return false;
    }

    this.cardsArray = [...restoreObject.cardsArray];
    this._pointer = restoreObject.pointer;
    return true;
  }

  public asCardArray(): Card[] {
    return this.cardsArray.map((c) => this.idToCard(c));
  }

  private idToCard(id: number): Card {
    let cardNumber = (id % 10) + 1;
    if (cardNumber > 7) {
      cardNumber += 2;
    }
    const res = new Card(this.translate);
    res.id = id;
    res.suit = suitsArray[Math.floor(id / 10)];
    res.cardNumber = cardNumber;

    return res;
  }
}
