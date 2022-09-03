import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { TranslateService } from '@ngx-translate/core';
import {
  DataRepositoryService,
  lsKeyAutoflipTime,
} from '../../services/data-repository.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Deck, DeckStatus } from '../../shared/deck';
import { Subscription, timer } from 'rxjs';
import { Card } from '../../shared/card';
@Component({
  selector: 'app-deck',
  templateUrl: './deck.page.html',
  styleUrls: ['./deck.page.scss'],
})
export class DeckPage implements OnInit, OnDestroy {
  private static readonly TAG = 'DeckPage';

  public currentCard: Card;
  public deckStatus: DeckStatus;
  public autoflip = { isOn: false, remainingTime: 0 };
  public autoflipTime = 0;
  public oneSecondTimer = timer(0, 1000);

  private deck = new Deck(this.translate);
  private autoflipSubscription: Subscription;

  public constructor(
    private animationCtrl: AnimationController,
    private repo: DataRepositoryService,
    private translate: TranslateService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.deck.shuffle();

    console.log(await TextToSpeech.getSupportedLanguages());
  }

  public ngOnDestroy(): void {
    this.autoflipSubscription?.unsubscribe();
  }

  public onClickOnDrawOne(): void {
    this.currentCard = this.deck.drawOne();
    this.deckStatus = this.deck.status;
  }

  public async onClickOnCard(): Promise<void> {
    this.flipOne();
    if (this.autoflip.isOn) {
      this.autoflip.remainingTime = this.autoflipTime;
    }
  }

  public async onChangeAutoflip($event: Event): Promise<void> {
    const customEvent = $event as CustomEvent;
    await this.startStopAutoflip(customEvent.detail.checked);
  }

  private async startStopAutoflip(isStart: boolean): Promise<void> {
    if (isStart) {
      const userAutoflip = (
        await this.repo.localStorageCheck(lsKeyAutoflipTime)
      ).value;
      this.autoflipTime = Number.parseInt(userAutoflip);
      this.autoflip = {
        isOn: true,
        remainingTime: this.autoflipTime,
      };

      this.autoflipSubscription = this.oneSecondTimer.subscribe(async () => {
        this.autoflip.remainingTime--;
        if (this.autoflip.remainingTime <= 0) {
          await this.flipOne();
          this.autoflip.remainingTime = this.autoflipTime;
        }
      });
    } else {
      this.autoflip = { isOn: false, remainingTime: 0 };
      this.autoflipSubscription?.unsubscribe();
    }
  }

  private async flipOne(): Promise<void> {
    const flipOut = this.animationCtrl
      .create()
      .addElement(document.querySelector('#currentCard'))
      .duration(200)
      .iterations(1)
      .fromTo(
        'transform',
        'perspective(50em) translateX(0) rotateY(0deg)',
        'perspective(50em) translateX(-80%) rotateY(90deg)'
      );
    const flipIn = this.animationCtrl
      .create()
      .addElement(document.querySelector('#currentCard'))
      .duration(400)
      .iterations(1)
      .keyframes([
        {
          offset: 0,
          transform: 'perspective(50em) translateY(0) rotateX(-90deg)',
        },
        {
          offset: 0.4,
          transform: 'perspective(50em) translateY(90px) rotateX(-45deg)',
        },
        {
          offset: 1,
          transform: 'perspective(50em) translateY(0) rotateX(0deg)',
        },
      ]);

    await flipOut.play();
    this.currentCard = this.deck.drawOne();
    setTimeout(async () => {
      await flipIn.play();
      this.deckStatus = this.deck.status;

      this.currentCard.speak();
    }, 100);
  }
}
