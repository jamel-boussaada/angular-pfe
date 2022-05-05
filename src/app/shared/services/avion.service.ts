import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AvionService {
    url = 'https://127.0.0.1:8000/avion';
  constructor(private http: HttpClient) { }

  getAllAvion(): Observable<any> {
    return this.http.get<any>(this.url + '/allAvion');
}


// getAvionById(id: number): Observable<any> {

//     return this.http.get<any>(environment.apiBaseUrl + '/avion/getAvionById/'+id);
// }

getAvionById(id: number): Observable<any> {

    return this.http.get<any>(this.url + '/getAvionById/'+id);
}


addReservasion(reservasion): Observable<any> {
    return this.http.post(this.url + '/addVol', reservasion);
}


addAvion(avion): Observable<any> {
    return this.http.post(this.url + '/addAvion', avion);
}


getLastAvionAdedId(): Observable<any> {

    return this.http.get<any>(this.url + '/getLastAvionAdedId');
}
}
