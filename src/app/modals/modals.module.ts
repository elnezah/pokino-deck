import { AutoFlipComponent } from './auto-flip/auto-flip.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [AutoFlipComponent],
  imports: [CommonModule],
  exports: [AutoFlipComponent],
})
export class ModalsModule {}
