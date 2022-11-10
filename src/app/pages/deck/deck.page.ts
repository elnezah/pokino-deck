import { CheckCardModalComponent } from '../../modals/check-card-modal/check-card-modal.component';
import { TranslateService } from '@ngx-translate/core';
import {
  DataRepositoryService,
  lsKeyAutoflipTime,
  lsKeySavedDeck,
} from '../../services/data-repository.service';
import { Component } from '@angular/core';
import {
  AlertController,
  AnimationController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Deck, DeckRestoreObject, DeckStatus } from '../../shared/deck';
import { Subscription, timer } from 'rxjs';
import { Card } from '../../shared/card';
@Component({
  selector: 'app-deck',
  templateUrl: './deck.page.html',
  styleUrls: ['./deck.page.scss'],
})
export class DeckPage {
  private static readonly TAG = 'DeckPage';

  public currentCard: Card;
  public deckStatus: DeckStatus;
  public autoflip = { isOn: false, remainingTime: 0 };
  public autoflipTime = 0;
  public oneSecondTimer = timer(0, 1000);
  public showProgress = true;
  public voice = true;
  public pauseAutoflip = false;

  private deck = new Deck(this.translate);
  private autoflipSubscription: Subscription;

  public constructor(
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private modalController: ModalController,
    private navController: NavController,
    private repo: DataRepositoryService,
    private toastController: ToastController,
    private translate: TranslateService
  ) {}

  public async ionViewDidEnter(): Promise<void> {
    this.startStopAutoflip(false);
    this.pauseAutoflip = false;

    // Deal with saved deck
    let savedDeck: DeckRestoreObject;

    // Try to get saved deck if any
    try {
      savedDeck = JSON.parse(
        (await this.repo.localStorageCheck(lsKeySavedDeck)).value
      ) as DeckRestoreObject;
    } catch (e) {
      console.error(DeckPage.TAG, 'error retrieving deck restore object', e);
    }

    if (savedDeck) {
      if (this.isSavedDeckDifferent(savedDeck)) {
        // Show alert and restore deck if user wants
        const alert = await this.alertController.create({
          header: this.translate.instant('GENERAL.alert_header_warning'),
          message: this.translate.instant('DECK.alert_message_restore_saved'),
          backdropDismiss: false,
          buttons: [
            {
              text: this.translate.instant('DECK.alert_button_restore'),
              role: 'restore',
            },
            {
              text: this.translate.instant('DECK.alert_button_new'),
              role: 'new',
            },
          ],
        });
        await alert.present();
        const res = await alert.onDidDismiss();

        if (res.role === 'restore') {
          this.restoreDeck(savedDeck);
        } else {
          this.startFresh();
        }
      } else {
        this.restoreDeck(savedDeck);
      }
    } else {
      this.startFresh();
    }
  }

  public async ionViewDidLeave(): Promise<void> {
    this.autoflipSubscription?.unsubscribe();

    if (this.deckStatus.remainingCards > 0) {
      const savedDeck = this.deck.getRestoreObject();
      await this.repo.localStorageSet(
        lsKeySavedDeck,
        JSON.stringify(savedDeck)
      );
    } else {
      await this.repo.localStorageRemove(lsKeySavedDeck);
    }
  }

  //#region Listeners
  public onClickOnDrawOne(): void {
    this.currentCard = this.deck.drawOne();
    this.deckStatus = this.deck.status;
  }

  public async onClickOnCard(): Promise<void> {
    await this.flipOne();
    if (this.autoflip?.isOn) {
      this.autoflip.remainingTime = this.autoflipTime;
    }
  }

  public async onChangeAutoflip($event: Event): Promise<void> {
    const customEvent = $event as CustomEvent;
    await this.startStopAutoflip(customEvent.detail.checked);
  }

  public async onClickOnRestart(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.translate.instant('GENERAL.alert_header_warning'),
      message: this.translate.instant('DECK.alert_message_restart_deck'),
      buttons: [
        {
          text: this.translate.instant('GENERAL.button_cancel'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('GENERAL.button_yes'),
          role: 'destructive',
        },
      ],
    });
    await alert.present();
    const res = await alert.onDidDismiss();

    if (res.role === 'cancel') {
      return;
    }

    this.startFresh();
  }

  public async onClickOnCheckCard(): Promise<void> {
    const modal = await this.modalController.create({
      component: CheckCardModalComponent,
      componentProps: { deck: this.deck },
    });
    await modal.present();
  }
  //#endregion

  public async showHelp(subject: 'autoflipBar' | 'progressBar'): Promise<void> {
    let message: string;
    let duration = 2000;
    switch (subject) {
      case 'autoflipBar':
        message = this.translate.instant('DECK.toast_autoflip_bar_help');
        break;
      case 'progressBar':
        message = this.translate.instant('DECK.toast_progress_bar_help');
        break;
    }
    const toast = await this.toastController.create({
      message,
      duration,
      buttons: [
        {
          icon: 'close',
          handler: () => toast.dismiss(),
        },
      ],
    });
    await toast.present();
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
        if (this.pauseAutoflip) {
          return;
        }

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
    // Setup animations
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

    // Play animation and voice
    await flipOut.play();
    this.currentCard = this.deck.drawOne();
    setTimeout(async () => {
      flipIn.play().then();
      if (this.voice) {
        this.currentCard.speak().then();
      }
      this.deckStatus = this.deck.status;

      if (this.deckStatus.remainingCards === 0) {
        await this.endGame();
      }
    }, 50);
  }

  /**
   * Shuffles the deck, resets everything and delete saved deck
   */
  private async startFresh(): Promise<void> {
    this.deck.shuffle();
    this.currentCard = undefined;
    this.deckStatus = { playedCars: 0, totalCards: 40, remainingCards: 40 };
    this.autoflip = { isOn: false, remainingTime: 0 };
    this.autoflipSubscription?.unsubscribe();
    this.autoflipTime = 0;
    await this.repo.localStorageRemove(lsKeySavedDeck);
  }

  private async endGame(): Promise<void> {
    await this.repo.localStorageRemove(lsKeySavedDeck);

    const alert = await this.alertController.create({
      header: this.translate.instant('DECK.alert_title_game_end'),
      message: this.translate.instant('DECK.alert_message_game_end'),
      buttons: [
        {
          role: 'restart',
          text: this.translate.instant('DECK.alert_button_game_end_restart'),
        },
        {
          role: 'exit',
          text: this.translate.instant('GENERAL.button_exit'),
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
    const res = await alert.onDidDismiss();

    if (res.role === 'restart') {
      this.startFresh();
      return;
    }

    await this.navController.navigateRoot('/');
  }

  private restoreDeck(savedDeck: DeckRestoreObject): void {
    this.deck.restoreDeck(savedDeck);
    this.currentCard = this.deck.getCurrentCard();
    this.deckStatus = {
      totalCards: 40,
      playedCars: this.deck.pointer + 1,
      remainingCards: 40 - (this.deck.pointer + 1),
    };
    if (this.deck.pointer === -1) {
      this.currentCard = undefined;
    }
  }

  /**
   * Checks whether a given DeckRestoreObject has the same data as the already present in this.
   * @return true is the data is different, false if is the same
   */
  private isSavedDeckDifferent(savedDeck: DeckRestoreObject): boolean {
    const thisCardsArray = this.deck.asCardArray();

    for (let i = 0; i < thisCardsArray.length; i++) {
      if (savedDeck.cardsArray[i] !== thisCardsArray[i].id) {
        return true;
      }
    }

    return savedDeck.pointer !== this.deck.pointer;
  }
}
