import { CheckCardComponent } from './check-card/check-card.component';
import { CardComponent } from './card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CardComponent, CheckCardComponent],
  imports: [IonicModule, CommonModule],
  exports: [CardComponent, CheckCardComponent]
})
export class ComponentsModule {}
