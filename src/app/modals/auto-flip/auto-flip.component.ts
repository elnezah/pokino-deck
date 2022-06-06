import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-flip',
  templateUrl: './auto-flip.component.html',
  styleUrls: ['./auto-flip.component.scss'],
})
export class AutoFlipComponent implements OnInit {
  private static readonly TAG = 'AutoFlipComponent';

  @Input() time: number;

  public constructor(private modalController: ModalController) {}

  public ngOnInit() {
    console.log(AutoFlipComponent.TAG, this.time);
  }

  //region Listeners
  public onClickOnClose() {
    this.modalController.dismiss(null, 'cancel');
  }

  public onRangeChange($event: CustomEvent): void {
    this.time = $event.detail.value;
  }

  public async onClickOnSave(): Promise<void> {
    await this.modalController.dismiss({time: this.time}, 'save');
  }
  //endregion
}
