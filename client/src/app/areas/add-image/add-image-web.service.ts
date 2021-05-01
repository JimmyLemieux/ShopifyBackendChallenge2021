import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddImageWebService {
  
  constructor(private _http: HttpClient) { }
  
  addImage(imageUrl: string): Observable<any> {
    let header = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let body = JSON.stringify({
      imageUrl: imageUrl,
      name: 'Image from front'
    });
    return this._http.post(`http://127.0.0.1:5000/addImage`, body , {
      headers: header
    }).pipe(catchError( err => throwError(err)));
  }
}
