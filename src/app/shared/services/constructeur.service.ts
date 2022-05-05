import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstructeurService {
    url = 'https://127.0.0.1:8000/Constructeur';
  constructor(private http: HttpClient) { }




  addConstructeur(construct): Observable<any> {
    return this.http.post(this.url + '/addConstructeur', construct);
}


getAllConstructer(): Observable<any> {
    return this.http.get(this.url + '/allConstructeur');
}

getConstructerByName(): Observable<any> {
    return this.http.get(this.url + '/getConstructerByName');
}

}
