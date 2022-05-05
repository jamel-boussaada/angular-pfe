import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComposantService {
    url = 'https://127.0.0.1:8000/Composant';
  constructor(private http: HttpClient) { }



  getComposantByAvion(id: number): Observable<any> {

    return this.http.get<any>(this.url + '/getComposantByAvion/'+id);
}
addComposant(composant): Observable<any> {
    return this.http.post(this.url + '/addComposant', composant);
}
getAllComposant(): Observable<any> {

    return this.http.get<any>(this.url + '/allComposant');
}


}
