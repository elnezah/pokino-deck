import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  private static readonly TAG = 'DeckComponent';

  public deck: number[];

  public constructor() {}

  ngOnInit() {}
}
