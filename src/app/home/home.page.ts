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
      .duration(200)
      .iterations(1)
      .fromTo('transform', 'perspective(50em) translateX(0) rotateY(0deg)', 'perspective(50em) translateX(-80%) rotateY(90deg)');
    const flipIn = this.animationCtrl
      .create()
      .addElement(document.querySelector('#currentCard'))
      .duration(400)
      .iterations(1)
      .keyframes([
        {offset: 0, transform:'perspective(50em) translateY(0) rotateX(-90deg)' },
        {offset: 0.4, transform:'perspective(50em) translateY(90px) rotateX(-45deg)'},
        {offset: 1, transform:'perspective(50em) translateY(0) rotateX(0deg)' }
      ]);

    await flipOut.play();
    this.currentCard = this.deck.drawOne();
    await flipIn.play();
    this.deckStatus = this.deck.status;
  }
}
