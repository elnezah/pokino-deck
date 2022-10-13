import { ModalController } from '@ionic/angular';
import { Deck } from './../../shared/deck';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-card-modal',
  templateUrl: './check-card-modal.component.html',
  styleUrls: ['./check-card-modal.component.scss'],
})
export class CheckCardModalComponent implements OnInit {
  private static readonly TAG = 'CheckCardModalComponent';

  @Input() deck: Deck;

  public constructor(private modalController: ModalController) {}

  public ngOnInit(): void {}

  public async onClickOnClose(): Promise<void> {
    await this.modalController.dismiss(null, 'cancel');
  }
}
