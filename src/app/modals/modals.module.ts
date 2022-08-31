import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AutoFlipComponent } from './settings/auto-flip/auto-flip.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LanguagesComponent } from './settings/languages/languages.component';

@NgModule({
  declarations: [AutoFlipComponent, LanguagesComponent],
  imports: [IonicModule, CommonModule, TranslateModule, FormsModule],
  exports: [AutoFlipComponent, LanguagesComponent],
})
export class ModalsModule {}
