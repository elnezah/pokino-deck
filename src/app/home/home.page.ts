import { TranslateService } from '@ngx-translate/core';
import {
  DataRepositoryService,
  lsKeyAutoflipTime,
} from './../services/data-repository.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Deck, DeckStatus } from '../shared/deck';
import { Subscription, timer } from 'rxjs';
import { Card } from '../shared/card';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private static readonly TAG = 'HomePage';

  public constructor(
    private animationCtrl: AnimationController,
    private repo: DataRepositoryService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {}

  //region Listeners
  //endregion
}
