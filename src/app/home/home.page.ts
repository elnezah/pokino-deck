import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
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

  public constructor(private animationCtrl: AnimationController) {}

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

  public async onClickOnCard(): Promise<void> {
    const flipOut = this.animationCtrl
      .create()
      .addElement(document.querySelector('#currentCard'))
      .duration(300)
      .iterations(1)
      .fromTo('transform', 'rotateX(0deg)', 'rotateX(90deg)');
    const flipIn = this.animationCtrl
      .create()
      .addElement(document.querySelector('#currentCard'))
      .duration(300)
      .iterations(1)
      .fromTo('transform', 'rotateX(-90deg)', 'rotateX(0deg)');

    await flipOut.play();
    this.currentCard = this.deck.drawOne();
    await flipIn.play();
    this.deckStatus = this.deck.status;
  }
}
