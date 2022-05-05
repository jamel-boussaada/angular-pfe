import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/services/notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
    message;
    nott;
    url = 'http://localhost:3000/.well-known/mercure';

    constructor(private notfifcationService: NotificationService) {}

    ngOnInit(): void {
        this.toastSystemNotification();
        this.sync();

        //     this.notfifcationService.getNotification().subscribe((response)=>{
        // const url = new URL(this.url);
        // url.searchParams.append('topic','/chat');
        // const eventsource = new EventSource(url);
        // eventsource.onmessage = (e) =>  {
        //     console.log(e);
        //     alert(e.data);
        //     this.message=(e.data);
        // };
        const url = new URL(this.url);
        url.searchParams.append('topic', '/chat');
        this.notfifcationService.getServerSentEvent(url).subscribe((res) => {
            this.message = res.data;
            console.log(res.data);
        });
        //     });
    }
    // notifier(): void {
    //     this.notfifcationService.getNotification().subscribe((res)=>{});
    //     const url = new URL(this.url);
    //     url.searchParams.append('topic', '/chat');
    //     this.notfifcationService.getServerSentEvent(url).subscribe((res) => {
    //         this.message = res;
    //         console.log(res);
    //     });


    // }

    sync(): void{
        this.notfifcationService.getNotification().subscribe((res)=>{});


    }

    toastSystemNotification(): void{

        this.notfifcationService.getNotificationToast().subscribe((res)=>{

        });

    }
}
