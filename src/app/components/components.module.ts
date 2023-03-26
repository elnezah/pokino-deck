import { CheckCardComponent } from './check-card/check-card.component';
import { CardComponent } from './card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PlayedCardsStripComponent } from './played-cards-strip/played-cards-strip.component';

@NgModule({
  declarations: [CardComponent, CheckCardComponent, PlayedCardsStripComponent],
  imports: [IonicModule, CommonModule],
  exports: [CardComponent, CheckCardComponent, PlayedCardsStripComponent]
})
export class ComponentsModule {}
