import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeComposantService {

    url = 'https://127.0.0.1:8000/typeComposant';
  constructor(private http: HttpClient) { }

  alltypeComposant(): Observable<any> {
    return this.http.get<any>(this.url + '/alltypeComposant');
}


}
