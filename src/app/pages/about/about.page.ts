import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  private static readonly TAG = 'AboutPage';

  public constructor(private modalController: ModalController) {}

  public ngOnInit() {}
}
