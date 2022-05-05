import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VolService } from 'app/shared/services/vol.service';

@Component({
  selector: 'app-vols',
  templateUrl: './vols.component.html',
  styleUrls: ['./vols.component.scss']
})
export class VolsComponent implements OnInit {
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    idAvion;
    reservasion;
  constructor(private volService: VolService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {

    this.idAvion=this.route.snapshot.params['id'];
this.getRes();
  }
  ajoutReservasion(): void{

  }

getRes(): void{
this.volService.reservasionByavion(Number(   this.idAvion)).subscribe((x)=>{
this.reservasion=x;
console.log(this.reservasion);
});

}
}
