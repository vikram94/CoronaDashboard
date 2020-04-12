import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CoronaDashboard';

  constructor(private router: Router, private readonly route: ActivatedRoute) {
    this.subscribeRouterEvents();
  }

  subscribeRouterEvents() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.title = data.state.root.firstChild.data.title;
      }
    });
  }
}
