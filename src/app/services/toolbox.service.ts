import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolboxService {
  private static readonly cTAG = 'ToolboxService';

  public constructor() {}

  public addLeadingZeros(n: number, totalLength = 0): string {
    let nu = n.toString();
    while (nu.length < totalLength) {
      nu = 0 + nu;
    }
    return nu;
  }
}
