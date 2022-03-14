import { Injectable } from '@angular/core';

export interface Card {
  id: number;
  suit: 'oro' | 'basto' | 'espada' | 'copa';
  cardNumber: number;
}

const suitsArray = ['oro', 'basto', 'espada', 'copa'];

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private static readonly TAG = 'DeckService';

  private deck: number[];
  private pointer = 0;

  public constructor() {
    this.deck = Array(40).map((e, i) => i);
  }

  /**
   * Shuffles the deck
   */
  public scuffle(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  public drawOne(): Card {
    this.pointer++;
    if (this.pointer >= this.deck.length) {
      this.pointer = this.deck.length - 1;
    }

    return this.idToCard(this.deck[this.pointer]);
  }

  public reset(): void {
    this.pointer = 0;
  }

  private idToCard(id: number): Card {
    let cardNumber = (id % 10) + 1;
    if (cardNumber > 7) {
      cardNumber += 2;
    }
    return {
      id,
      suit: suitsArray[Math.floor(id / 10)],
      cardNumber,
    } as Card;
  }
}
