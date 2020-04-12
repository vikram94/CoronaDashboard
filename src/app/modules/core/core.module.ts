import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {PollService} from '../../services/poll/poll-service';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    SharedModule
  ],

  // All the services will go in this module only
  providers: [
    PollService
  ]
})

export class CoreModule {
}
