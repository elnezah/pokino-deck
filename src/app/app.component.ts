import {
  DataRepositoryService,
  lsKeyAutoflipTime,
} from './services/data-repository.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface SideMenuEntry {
  textKey: string;
  iconName?: string;
  iconSrc?: string;
  link: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private static readonly TAG = 'AppComponent';

  public sideMenuEntries: SideMenuEntry[] = [
    {
      textKey: 'MENU.ENTRIES.home',
      link: '/home',
      iconName: 'home',
    },
    { textKey: 'MENU.ENTRIES.settings', link: '/settings', iconName: 'settings' },
    { textKey: 'MENU.ENTRIES.about', link: '/about', iconName: 'information-circle' },
  ];

  public constructor(
    private repo: DataRepositoryService,
    private translate: TranslateService
  ) {}

  public async ngOnInit(): Promise<void> {
    // Configure ngx-translate
    this.translate.setDefaultLang('es');
    try {
      await this.translate.use(this.translate.getBrowserLang()).toPromise();
    } catch (e) {
      console.error(AppComponent.TAG, 'error loading browser language', e);
    }

    await this.loadFactoryDefaults();
  }

  private async loadFactoryDefaults(): Promise<void> {
    if (!(await this.repo.localStorageCheck(lsKeyAutoflipTime)).value) {
      await this.repo.localStorageSet(lsKeyAutoflipTime, '5');
    }
  }
}
