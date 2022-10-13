import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Card } from '../shared/card';

@Injectable({
  providedIn: 'root',
})
export class ToolboxService {
  private static readonly cTAG = 'ToolboxService';

  public constructor(private translate: TranslateService) {}

  public addLeadingZeros(n: number, totalLength = 0): string {
    let nu = n.toString();
    while (nu.length < totalLength) {
      nu = 0 + nu;
    }
    return nu;
  }

  public idToCard(id: number): Card {
    let cardNumber = (id % 10) + 1;
    if (cardNumber > 7) {
      cardNumber += 2;
    }
    const res = new Card(this.translate);
    const suitsArray = ['oro', 'basto', 'espada', 'copa'];
    res.id = id;
    res.suit = suitsArray[Math.floor(id / 10)] as
      | 'oro'
      | 'basto'
      | 'espada'
      | 'copa';
    res.cardNumber = cardNumber;

    return res;
  }
}
