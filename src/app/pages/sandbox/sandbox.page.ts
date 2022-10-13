import { TranslateService } from '@ngx-translate/core';
import { Deck } from './../../shared/deck';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.page.html',
  styleUrls: ['./sandbox.page.scss'],
})
export class SandboxPage implements OnInit {
  private static readonly TAG = 'SandboxPage';

  public deck: Deck;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.deck = new Deck(this.translate);
    this.deck.shuffle();
    this.deck.drawOne();
    this.deck.drawOne();
    this.deck.drawOne();
    this.deck.drawOne();
  }

}
