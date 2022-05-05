import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    url='http://localhost:3000/.well-known/mercure';
    baseUrl='https://127.0.0.1:8000';
    constructor(private zone: NgZone,
        private http: HttpClient) { }



        getNotificationToast(): Observable<any> {
            return this.http.get(this.baseUrl+ '/invoice/create');
        }

        getNotification(): Observable<any> {
            return this.http.post(this.baseUrl+ '/notification','kk');
        }

    getServerSentEvent(url: any): Observable<MessageEvent> {
        return new Observable((observer) => {
            const eventSource = this.getEventSource(url);

            eventSource.onmessage = (event): void => {
                this.zone.run(() => observer.next(event));
            };
        });
    }


  private getEventSource(url: string): EventSource {
    return new EventSource(url);
}





}
