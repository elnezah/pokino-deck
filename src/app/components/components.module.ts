import { DeckComponent } from './deck/deck.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DeckComponent],
  imports: [
    CommonModule
  ],
  exports:[DeckComponent]
})
export class ComponentsModule { }
