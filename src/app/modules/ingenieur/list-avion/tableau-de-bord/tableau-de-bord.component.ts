import { AvionService } from 'app/shared/services/avion.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    NavigationEnd,
    Router,
    ActivatedRoute,
    NavigationStart,
} from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { AnimationPlayer } from '@angular/animations';

@Component({
    selector: 'app-tableau-de-bord',
    templateUrl: './tableau-de-bord.component.html',
    styleUrls: ['./tableau-de-bord.component.scss'],
})
export class TableauDeBordComponent implements OnInit {

    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    idAvion = '';
    errors;
    avion;
    p;
    oldValue;
    previousUrl;
    avions;
    affiche =false;

    constructor(private router: Router, private avionService: AvionService,
        private route: ActivatedRoute,) {}

    ngOnInit(): void {
        // this.router.events.subscribe((val) => {
        //     this.p = val;
        //     this.previousUrl=
        //     console.log(this.router.config[9]);




        //     const pathArray = window.location.pathname.split('/');
        //     console.log(window.location.pathname);
        //     this.idAvion = pathArray[3];
        //     this.previousUrl=this.idAvion;
        //        if (this.previousUrl === this.idAvion){
        //         this.getAvionByid();
        //        this.affiche=true;
        //         // this.getAllAvion();
        //         // alert( this.idAvion);
        //        }
        // });


        this.idAvion=this.route.snapshot.params['id'];

        this.getAvionByid();
        //    this.router.queryParams.forEach((params: any) => {
        //     console.log("QUERYPARAMS");
        //     console.log(params);
        //   });

        //    this.getAvionByid();
        // if(this.oldValue !== this.idAvion){

        //     window.location.reload();

        // }

        //   this.router.events.subscribe((val) => {
        //         const pathArray = window.location.pathname.split('/');
        //         this.idAvion=pathArray[3];
        //         this.getAvionByid();
        //     });

        // alert(this.idAvion);
        // this.ngOnInit();
        // this.refresh();

        // if(this.oldValue !== this.idAvion){
        //     this.getAvionByid();
        // }
    }

    ajouElement(): void {}

    getAvionByid(): void {
        this.avionService.getAvionById(Number(this.idAvion)).subscribe({
            next: (v) => {

                console.log(v);
                this.avion = v;
                this.affiche =true;
            },
            error: (e) => {
                console.error(e);
                this.affiche =false;
            },
            complete: () => console.log('complete'),
        });
    }

    getAllAvion(): any {
        //Todo get all avion
        this.avionService.getAllAvion().subscribe((data) => {
            this.avions = data;
            // alert(this.idAvion === this.avions.id);
            if (this.idAvion === this.avions.id) {

                console.log(this.avions);
                return this.avions;
            }
        });
    }
}
