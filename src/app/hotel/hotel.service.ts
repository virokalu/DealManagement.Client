import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from './hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = "https://localhost:7222/api/Hotels/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  add(hotel: Hotel): Observable<any> {
    return this.httpClient.post(this.apiUrl, JSON.stringify(hotel), this.httpOptions)
  }
  
  update(id: number, hotel: Hotel): Observable<any> {
    return this.httpClient.put(this.apiUrl + id, JSON.stringify(hotel), this.httpOptions)
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + id, this.httpOptions)
  }
}
