import { Component, OnInit } from '@angular/core';
import {PollService} from '../services/poll/poll-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _pollService: PollService) { }

  ngOnInit(): void {
    this._pollService.fetchAreaResult({
      createDate : '2019-12-22 19:56:29',
      areaId : '5106'
    }).subscribe(res => console.log(res));
  }

}
