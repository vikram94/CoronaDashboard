import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {PollService} from '../../services/poll/poll-service';
import {SharedModule} from '../shared/shared.module';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from './font-awesome-icons';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    SharedModule,
  ],

  // All the services will go in this module only
  providers: [
    PollService
  ]
})

export class CoreModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
