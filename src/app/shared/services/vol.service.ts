import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolService {
    url = 'https://127.0.0.1:8000/vol';
    constructor(private http: HttpClient) {}

    getAllReservasion(): Observable<any> {
        return this.http.get<any>(this.url + '/allVol');
    }
    addReservasion(reservasion): Observable<any> {
        return this.http.post(this.url + '/addVol', reservasion);
    }

    reservasionByavion(id: number): Observable<any>  {
        return this.http.get(this.url + '/reservasionByavion/' + id);
    }
}
