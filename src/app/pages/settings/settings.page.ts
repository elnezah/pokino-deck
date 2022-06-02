import { DataRepositoryService } from './../../services/data-repository.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutoFlipComponent } from 'src/app/modals/auto-flip/auto-flip.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private static readonly TAG = 'SettingsPage';

  public constructor(
    private modalController: ModalController,
    private repo: DataRepositoryService
  ) {}

  public async ngOnInit(): Promise<void> {}

  public async onClickOnAutoFlip() {
    const modal = await this.modalController.create({
      component: AutoFlipComponent,
    });

    await modal.present();
    const res = await modal.onDidDismiss();
    const time = res.data.time;
    console.log(SettingsPage.TAG, { res, time });
  }
}
