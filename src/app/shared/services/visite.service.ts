import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

    url = 'https://127.0.0.1:8000/visite';
    constructor(private http: HttpClient) {}

    getAllVisites(): Observable<any> {
        return this.http.get<any>(this.url + '/allVisite');
    }

    oneViste(id: number): Observable<any>  {
        return this.http.get(this.url + '/oneVisite/' + id);
    }
    updateViste(id: any ,object: any): Observable<any> {
        return this.http.put(this.url + '/updateVisite/' + id,object);
    }
    vsisiteInitial(object: JSON): Observable<any> {
        return this.http.post(this.url + '/initialVisite', object);
    }


    updateVisiteOperations(id: any ,object: any): Observable<any> {
        return this.http.put(this.url + '/updateVisiteOperations/' + id,object);
    }

    getViiteByIntervenant(id: number): Observable<any>  {
        return this.http.get(this.url + '/getViiteByIntervenant/' + id);
    }

}
