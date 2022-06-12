import { browser } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface SideMenuEntry {
  text: string;
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
    { text: 'Home', link: '/home', iconName: 'home' },
    { text: 'Configuracion', link: '/settings', iconName: 'settings' },
    { text: 'Acerca de', link: '/about', iconName: 'id' },
  ];

  public constructor(private translate: TranslateService) {}

  public async ngOnInit(): Promise<void> {
    // Configure ngx-translate
    this.translate.setDefaultLang('es');
    await this.translate.use(this.translate.getBrowserLang()).toPromise();
  }
}
