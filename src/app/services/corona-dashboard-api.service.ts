import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../../environments/environment';

@Injectable()
export class CoronaDashboardApiService extends ApiService {
  getBaseUrl(): string {
    return environment.apiBaseUrl;
  }
}
