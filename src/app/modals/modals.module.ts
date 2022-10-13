import { CheckCardModalComponent } from './check-card-modal/check-card-modal.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AutoFlipComponent } from './settings/auto-flip/auto-flip.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LanguagesComponent } from './settings/languages/languages.component';

@NgModule({
  declarations: [AutoFlipComponent, LanguagesComponent, CheckCardModalComponent],
  imports: [IonicModule, CommonModule, TranslateModule, FormsModule],
  exports: [AutoFlipComponent, LanguagesComponent, CheckCardModalComponent],
})
export class ModalsModule {}
