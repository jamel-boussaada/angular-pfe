import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraveauSupplimentaireService {
    url = 'https://127.0.0.1:8000/TraveauSupplimentaire';
  constructor(private http: HttpClient) { }

  getTraveauByAvion(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/getTraveauSuppByAvion/'+id);
}

setVisiteTotraveau(id: number,visite: any): Observable<any> {
    return this.http.put<any>(this.url + '/updateTraveauxVisite/'+id,visite);
}







}
