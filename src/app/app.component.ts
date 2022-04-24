import { Component } from '@angular/core';

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
export class AppComponent {
  private static readonly TAG = 'AppComponent';

  public sideMenuEntries: SideMenuEntry[] = [
    { text: 'Home', link: '/home', iconName: 'home' },
    { text: 'Configuracion', link: '/settings', iconName: 'settings' },
    { text: 'Acerca de', link: '/about', iconName: 'id' }
  ];

  public constructor() {}
}
