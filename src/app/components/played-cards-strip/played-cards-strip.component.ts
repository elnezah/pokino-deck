import { Card } from './../../shared/card';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-played-cards-strip',
  templateUrl: './played-cards-strip.component.html',
  styleUrls: ['./played-cards-strip.component.scss'],
})
export class PlayedCardsStripComponent implements OnInit, OnChanges {
  private static readonly TAG = 'PlayedCardsStripComponent';

  @Input() cardsArray: Card[] = [];
  @Input() pointer = -1;

  public cardsToShow: Card[] = [];

  public constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    this.cardsToShow = this.cardsArray.slice(0, this.pointer + 1).reverse();
  }
}
