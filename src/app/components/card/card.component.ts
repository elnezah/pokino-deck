import { ToolboxService } from './../../services/toolbox.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Card } from 'src/app/shared/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnChanges {
  private static readonly cTAG = 'CardComponent';

  @Input() card: Card;

  public imgSrc: string;

  public constructor(private tb: ToolboxService) {}

  public ngOnInit() {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.imgSrc = this.card ? this.cardToImgFilePath(this.card) : 'assets/img/cards/reverso.png';
  }

  private cardToImgFilePath(c: Card): string {
    if (!c || isNaN(c.cardNumber) || c.id == null || c.suit == null ) {
      return 'assets/img/cards/reverso.png';
    }
    const id = this.tb.addLeadingZeros(c.id, 2);
    const n = this.tb.addLeadingZeros(c.cardNumber, 2);
    return `assets/img/cards/${id}_${c.suit}_${n}.png`;
  }
}
