import {CoronaDashboardApiService} from '../corona-dashboard-api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AreaResultResponseModel} from '../../models/responses/area-result-response.model';
import {map} from 'rxjs/operators';


@Injectable()
export class PollService extends CoronaDashboardApiService {
  fetchAreaResult(data: any): Observable<AreaResultResponseModel> {
    return this.post<AreaResultResponseModel>('/poll/getAreaResult', false, data)
      .pipe(map(r => r));
  }
}
