import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export abstract class ApiService {
  constructor(protected http: HttpClient, protected router: Router) {
  }

  static getToken(): string {
    return localStorage.getItem('AUTH_TOKEN');
  }

  private static buildParams(data: any): HttpParams {
    let params = new HttpParams();
    if (data) {
      for (const key of Object.keys(data)) {
        console.log('KEY', key);
        // Beware .append is not mutable operation
        params = params.append(key, data[key]);
      }
    }
    return params;
  }

  private static _buildHeaders(useAuthHeaders: boolean, headers?: HttpHeaders): HttpHeaders {
    if (!useAuthHeaders) {
      return headers;
    }
    let mutatedHeaders: HttpHeaders;

    if (headers) {
      mutatedHeaders = headers;
    } else {
      mutatedHeaders = new HttpHeaders();
    }
    return mutatedHeaders.set('Authorization', this.getToken());
  }

  abstract getBaseUrl(): string;

  get<T>(url: string, useAuthHeaders: boolean, data?: any, headers?: HttpHeaders, useBaseUrl: boolean = true,
         responseType?: string): Observable<T> {
    console.log('[api.service] get', url, data);
    let options: any = {
      params: data,
      headers: ApiService._buildHeaders(useAuthHeaders, headers),
    };
    if (responseType) {
      options = {
        ...options,
        responseType
      };
    }
    // @ts-ignore
    return this.http.get<T>(useBaseUrl ? this.getBaseUrl() + url : url, options).pipe(catchError(err => this.handleError(err)));
  }

  post<T>(url: string, useAuthHeaders: boolean, data: any, headers?: HttpHeaders, useBaseUrl: boolean = true,
          responseType?: string, withCredentials = false): Observable<T> {
    let options: any = useAuthHeaders ? {
      headers: ApiService._buildHeaders(useAuthHeaders, headers)
    } : {};
    if (responseType || withCredentials) {
      options = {
        ...options,
        responseType,
        withCredentials
      };
    }
    // @ts-ignore
    return this.http.post<T>(useBaseUrl ? this.getBaseUrl() + url : url, data, options).pipe(catchError(err => this.handleError(err)));
  }

  put<T>(url: string, useAuthHeaders: boolean, data: any, headers?: HttpHeaders, useBaseUrl: boolean = true, responseType?: string, withCredentials = false): Observable<T> {
    let options: any = useAuthHeaders ? {
      headers: ApiService._buildHeaders(useAuthHeaders, headers)
    } : {};
    if (responseType || withCredentials) {
      options = {
        ...options,
        responseType,
        withCredentials
      };
    }
    // @ts-ignore
    return this.http.put<T>(useBaseUrl ? this.getBaseUrl() + url : url, data, options).pipe(catchError(err => this.handleError(err)));
  }

  delete<T>(url: string, useAuthHeaders: boolean, headers?: HttpHeaders, useBaseUrl: boolean = true,
            responseType?: string, withCredentials = false): Observable<T> {
    let options: any = useAuthHeaders ? {
      headers: ApiService._buildHeaders(useAuthHeaders, headers)
    } : {};
    if (responseType || withCredentials) {
      options = {
        ...options,
        responseType,
        withCredentials
      };
    }
    // @ts-ignore
    return this.http.delete<T>(useBaseUrl ? this.getBaseUrl() + url : url, options).pipe(catchError(err => this.handleError(err)));
  }

  upload(url: string, file: File): Observable<any> {
    return this.http.put(url, file, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public handleError(httpErrorResponse: HttpErrorResponse) {
    if (httpErrorResponse.status === 401) {
      this.router.navigateByUrl('/logout');
    }
    const error = httpErrorResponse.error;
    let message = 'errors' in error ?
      error.errors[Object.keys(error.errors)[0]][0] : 'message' in error ?
        error.message : httpErrorResponse.statusText;

    if (message === 'Unknown Error' && error instanceof ProgressEvent) {
      message = 'Please check your internet connection!';
    }
    return throwError({ message, error });
  }
}
