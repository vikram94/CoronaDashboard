import { Component, OnInit } from '@angular/core';
import {PollService} from '../services/poll/poll-service';
import {AreaResultModel} from '../models/responses/area-result.model';
import {AreaResultResponseModel} from '../models/responses/area-result-response.model';
import {keys} from 'ts-transformer-keys';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbProgressbarConfig]
})
export class DashboardComponent implements OnInit {

  constructor(private _pollService: PollService, private progressBarConfig: NgbProgressbarConfig) { }


  chartLabels: string[] = ['Age 18 to 24', 'Age 25 to 35', 'Above 35+'];
  chartData: number[] = [0, 0, 0];
  chartType = 'doughnut';
  areaResult: AreaResultResponseModel;
  chartOptions: ChartOptions = {
    responsive: true,
    cutoutPercentage: 80,
    legend: {
      position: 'bottom',
      fullWidth: false,
      labels: {
        usePointStyle: true
      }
    }
  };
  isLoading = false;
  donutColors = [
    {
      backgroundColor: [
        '#ED7675',
        '#75B7F8',
        '#6CEFC4'
      ]
    }
  ];
  dataSets: ChartDataSets;
  legend;
  dateControl = new FormControl();
  areaControl = new FormControl();

  ngOnInit(): void {
    this.setChartLabels();
    this.dateControl.valueChanges.subscribe(value => {
      this.isLoading = true;
      this._pollService.fetchAreaResult({
        createDate : value.toLocaleString(),
        areaId : '5106'
      }).pipe(take(1)).subscribe(res => {
        this.areaResult = res;
        this.setChartData(res.areaResult);
        this.isLoading = false;
      });
    });
  }

  setChartLabels() {
    this.chartLabels = [
      'Poor Health',
      'Unwell with no symptoms',
      'Good Health',
    ];
  }

  setChartData(data: AreaResultModel) {
    const arr = [data.totalUnwellWithSymptoms, data.totalUnwellWithNoSymptoms, data.totalWell];
    this.chartData = arr;
    this.progressBarConfig.max  = data.totalParticipation;
    this.progressBarConfig.showValue = true;
  }

  chartClicked(e: any) {
  }

  chartHovered(e: any){
  }

}
