import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgrammeEntretienService {
    url = 'https://127.0.0.1:8000/programmeEntretien';
  constructor(private http: HttpClient) { }


  getAllProgramme(): Observable<any> {
    return this.http.get<any>(this.url + '/getAllProgramme');
}

addProgEntretien(prog): Observable<any> {
    return this.http.get<any>(this.url + '/addProgEntretien',prog);
}



}
