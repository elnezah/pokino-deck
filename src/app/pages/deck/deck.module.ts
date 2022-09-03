import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeckPageRoutingModule } from './deck-routing.module';

import { DeckPage } from './deck.page';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DeckPageRoutingModule,
    TranslateModule
  ],
  declarations: [DeckPage],
})
export class DeckPageModule {}
