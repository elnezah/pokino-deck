import { Component, OnInit } from '@angular/core';
import { Deck, Card, DeckStatus } from '../shared/deck';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private static readonly TAG = 'HomePage';

  public currentCard: Card;
  public deckStatus: DeckStatus;

  private deck = new Deck();

  public constructor() {}

  public ngOnInit(): void {
    this.deck.shuffle();

    console.log(HomePage.TAG, {
      deck: this.deck,
      cards: this.deck.asCardArray(),
    });
  }

  public onClickOnDrawOnw(): void {
    this.currentCard = this.deck.drawOne();
    this.deckStatus = this.deck.status;
  }

  public onClickOnCard(): void {
    this.currentCard = this.deck.drawOne();
    this.deckStatus = this.deck.status;
  }
}
