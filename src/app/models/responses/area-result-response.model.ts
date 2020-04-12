import {AreaStatModel} from './area-stat.model';
import {AreaResultModel} from './area-result.model';
import {BaseResponse} from './base-response';

export interface  AreaResultResponseModel extends BaseResponse{
  areaResult: AreaResultModel;
  areaResultStat: AreaStatModel;
}
