import { Component, OnInit } from '@angular/core';

type Prize = { titleKey: string; textKey: string; imagePath: string };

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {
  private static readonly TAG = 'InstructionsPage';

  public instructionsPoints: string[];
  public clarificationsPoints: string[];
  public prizes: Prize[];

  public constructor() {
    this.instructionsPoints = new Array(9)
      .fill(null)
      .map((e, i) => (i < 10 ? '0' + (i + 1).toString() : (i + 1).toString()));
    this.clarificationsPoints = new Array(4)
      .fill(null)
      .map((e, i) => (i < 10 ? '0' + (i + 1).toString() : (i + 1).toString()));

    this.prizes = [
      {
        titleKey: 'INSTRUCTIONS.PRIZES.centro_title',
        textKey: 'INSTRUCTIONS.PRIZES.centro_text',
        imagePath: 'assets/img/prizes/centro.jpg',
      },
      {
        titleKey: 'INSTRUCTIONS.PRIZES.full_title',
        textKey: 'INSTRUCTIONS.PRIZES.full_text',
        imagePath: 'assets/img/prizes/full.jpg',
      },
      {
        titleKey: 'INSTRUCTIONS.PRIZES.poker_title',
        textKey: 'INSTRUCTIONS.PRIZES.poker_text',
        imagePath: 'assets/img/prizes/poker.jpg',
      },
      {
        titleKey: 'INSTRUCTIONS.PRIZES.esquina_title',
        textKey: 'INSTRUCTIONS.PRIZES.esquina_text',
        imagePath: 'assets/img/prizes/esquina.jpg',
      },
      {
        titleKey: 'INSTRUCTIONS.PRIZES.estampa_title',
        textKey: 'INSTRUCTIONS.PRIZES.estampa_text',
        imagePath: 'assets/img/prizes/estampa.jpg',
      },
      {
        titleKey: 'INSTRUCTIONS.PRIZES.pokino_title',
        textKey: 'INSTRUCTIONS.PRIZES.pokino_text',
        imagePath: 'assets/img/prizes/pokino.jpg',
      },
    ];
  }

  public ngOnInit() {}
}
