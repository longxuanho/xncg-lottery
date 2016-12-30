import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from './core/shared/settings.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  subscriptions: {
    settings?: Subscription
  } = { }

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.subscriptions.settings = this.settingsService.syncSettings();
  }

  ngOnDestroy() {
      this.subscriptions.settings.unsubscribe();
  }
}
