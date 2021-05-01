import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ImagesModel } from './models/images-model';

@Injectable({
  providedIn: 'root'
})
export class HomeWebService {

  constructor(private _http: HttpClient) { }

  getImagesByKeyword(keyword: string): Observable<any> {
    return this._http.get(`http://127.0.0.1:5000/getImages`).pipe(
      catchError(err => throwError(err)));
  }
}
