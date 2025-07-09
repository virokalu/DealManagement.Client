import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Deal } from './deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  private apiUrl = "https://localhost:7222/api/Deals/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getDeals(): Observable<Deal[]> {
    return this.httpClient.get<Deal[]>(this.apiUrl)
  }

  add(deal: Deal): Observable<any> {
    return this.httpClient.post(this.apiUrl, JSON.stringify(deal), this.httpOptions)
  }

  get(slug: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + slug)
  }

  update(slug: string, deal: Deal): Observable<any> {
    return this.httpClient.put(this.apiUrl + slug, JSON.stringify(deal), this.httpOptions)
  }

  delete(slug:string):Observable<any>{
    return this.httpClient.delete(this.apiUrl + slug, this.httpOptions)
  }
}
