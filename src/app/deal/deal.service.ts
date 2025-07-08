import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Deal } from './deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  private apiUrl = "https://localhost:7222/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getDeals(): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'Deals')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  add(deal: Deal): Observable<any> {
    return this.httpClient.put(this.apiUrl + 'Deals', JSON.stringify(deal), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  get(slug: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'Deals' + slug)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(slug: string, deal: Deal): Observable<any> {
    return this.httpClient.put(this.apiUrl + 'Deals' + slug, JSON.stringify(deal), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(slug:string):Observable<any>{
    return this.httpClient.get(this.apiUrl + 'Deals' + slug, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
