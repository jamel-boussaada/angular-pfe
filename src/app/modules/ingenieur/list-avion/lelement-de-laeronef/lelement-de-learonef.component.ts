import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComposantService } from 'app/shared/services/composant.service';

@Component({
  selector: 'app-lelement-de-learonef',
  templateUrl: './lelement-de-learonef.component.html',
  styleUrls: ['./lelement-de-learonef.component.scss']
})

export class LelementDeLearonefComponent implements OnInit {
    @Input() moteur = [];
    @Input() helice = [];
    @Input() composant;
     // decorate the property with @Input()
    idAvion='';
    isLoading: boolean = false;

    composExisit=false;


    searchInputControl: FormControl = new FormControl();
  constructor(private router: Router,
    private route: ActivatedRoute,
    private composantService: ComposantService
    ) {
//          router.events.subscribe((val) => {
//     const pathArray = window.location.pathname.split('/');
//     this.idAvion=pathArray[3];
// });

}


  ngOnInit(): void {
    this.idAvion=this.route.snapshot.params['id'];
    // alert(this.idAvion);
this.getComposantByAvion();

  }
ajouElement(): void{

}

getComposantByAvion(): void {
    this.composantService.getComposantByAvion(Number(this.idAvion)).subscribe((comp) => {
        this.composant=comp;
        console.log(this.composant);
        this.composExisit=true;
        this.composant.forEach((val: any) => {
        if(val.nomComposant.localeCompare('moteur') === 1 ||val.nomComposant === 'moteur'  )
        {
        this.moteur.push(val);
        console.log(    this.moteur);

        }else if(val.nomComposant.localeCompare('moteur') === -1){
            this.helice.push(val);
            console.log(    this.helice);
        }
        });
        });

}


}
