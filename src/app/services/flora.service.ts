import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloraService {

  private baseUrl = 'https://tahuranow.vercel.app';

  constructor(private http: HttpClient) {}

  getFloraDetails(id: String): Observable<any> {
    const url = `${this.baseUrl}/api/getFloraDetails/${id}`;
    return this.http.get<any>(url);
  }
  getAllFlora(): Observable<any> {
    const url = `${this.baseUrl}/api/getAllFlora`;
    return this.http.get<any>(url);
  }
}
