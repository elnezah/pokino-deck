import { Card } from './../../shared/card';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-played-cards-strip',
  templateUrl: './played-cards-strip.component.html',
  styleUrls: ['./played-cards-strip.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class PlayedCardsStripComponent implements OnInit, OnChanges {
  private static readonly TAG = 'PlayedCardsStripComponent';

  @Input() cardsArray: Card[] = [];
  @Input() pointer = -1;

  public cardsToShow: Card[] = [];

  public constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(c: SimpleChanges): void {
    if (c.pointer && c.pointer.currentValue !== c.pointer.previousValue) {
      this.cardsToShow = this.cardsArray.slice(0, this.pointer + 1).reverse();
    }
  }
}
