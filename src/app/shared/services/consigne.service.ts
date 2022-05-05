import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsigneService {
    url = 'https://127.0.0.1:8000/consigne';
  constructor(private http: HttpClient) { }



  getConsigneByModele(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/getConsigneByModele/'+id);
}
}
