import { CardComponent } from './card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CardComponent],
  imports: [IonicModule, CommonModule],
  exports: [CardComponent]
})
export class ComponentsModule {}
