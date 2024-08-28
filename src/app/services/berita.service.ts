import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeritaService {

  private baseUrl = 'http://localhost:4242';

  constructor(private http: HttpClient) {}

  getBeritaDetails(id: String): Observable<any> {
    const url = `${this.baseUrl}/api/getBeritaDetails/${id}`;
    return this.http.get<any>(url);
  }
  getAllBerita(): Observable<any> {
    const url = `${this.baseUrl}/api/getAllBerita`;
    return this.http.get<any>(url);
  }
}
