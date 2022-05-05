import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-avion',
  templateUrl: './list-avion.component.html',
  styleUrls: ['./list-avion.component.scss']
})
export class ListAvionComponent implements OnInit {


    idAvion='';
  constructor(private router: Router) {
 }

  ngOnInit(): void {
    // this.router.events.subscribe((val) => {


    //     const pathArray = window.location.pathname.split('/');
    //     this.idAvion=pathArray[3];
    // });
  }

}
