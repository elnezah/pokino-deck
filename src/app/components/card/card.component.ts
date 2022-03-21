import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/deck';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  private static readonly TAG = 'CardComponent';

  @Input() card: Card;

  public constructor() {}

  public ngOnInit() {}
}
