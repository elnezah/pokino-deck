import { AutoFlipComponent } from './auto-flip/auto-flip.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AutoFlipComponent],
  imports: [IonicModule, CommonModule],
  exports: [AutoFlipComponent],
})
export class ModalsModule {}
