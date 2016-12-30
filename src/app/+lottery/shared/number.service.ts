import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { SettingsService } from '../../core/shared/settings.service';

@Injectable()
export class NumberService {

  

  constructor(
    private af: AngularFire,
    private settingService: SettingsService
  ) { }

  generateWinningNumber() {
    
  }

}
