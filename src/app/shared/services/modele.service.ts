import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

    url = 'https://127.0.0.1:8000/Modele';
  constructor(private http: HttpClient) { }




  addModele(modele): Observable<any> {
    return this.http.post(this.url + '/addModele', modele);
}


getAllModele(): Observable<any> {
    return this.http.get(this.url + '/allModele');
}


lastModelId(): Observable<any> {
    return this.http.get(this.url + '/lastModel');
}
}
