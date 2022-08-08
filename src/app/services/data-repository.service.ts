import { Injectable } from '@angular/core';
import { GetResult, Storage } from '@capacitor/storage';

// Local storage constants
/**
 * The amount of time (in seconds) for the cards to be flipped automatically
 */
export const lsKeyAutoflipTime = 'lsKeyAutoflipTime';

/**
 * The language selected by the user
 */
export const lsKeyUserLanguage = 'lsKeyUserLanguage';

/**
 * The volume for the voice that tells the cards
 */
export const lsKeyVoiceVolume = 'lsKeyVoiceVolume';

/**
 * The volume for TTS voice type
 */
export const lsKeyVoiceType = 'lsKeyVoiceType';

@Injectable({
  providedIn: 'root',
})
export class DataRepositoryService {
  private static readonly TAG = 'DataRepositoryService';

  public constructor() {}

  public async localStorageSet(key: string, value: string): Promise<void> {
    return await Storage.set({ key, value });
  }

  public async localStorageCheck(key: string): Promise<GetResult> {
    return await Storage.get({ key });
  }

  public async localStorageRemove(key: string): Promise<void> {
    return await Storage.remove({ key });
  }
}
