import { NavigationExtras, Router } from '@angular/router';
import { messages } from './../../../mock-api/common/messages/data';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { VisiteService } from 'app/shared/services/visite.service';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
  selector: 'app-visite-technecien',
  templateUrl: './visite-technecien.component.html',
  styleUrls: ['./visite-technecien.component.scss']
})
export class VisiteTechnecienComponent implements OnInit {

visite;
    jwtHelper;
    userDetails;
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
  constructor(private visiteService: VisiteService ,
private route: Router,
    ) { }

  ngOnInit(): void {
const token=localStorage.getItem('authentificationToken');
this.jwtHelper = new JwtHelperService();
this.userDetails =  this.jwtHelper.decodeToken(token);
this.geTvisiteByIntervenant();
     // Set the alert
// console.log(this.userDetails);

  }
  ajoutTraveau(): void{

  }
geTvisiteByIntervenant(): void{

    this.visiteService.getViiteByIntervenant(this.userDetails.id).subscribe((x)=>{
this.visite =x;
// console.log(this.visite);
    });

}
startVisite(visite: any): void{
    console.log(visite);

const navigationExtras: NavigationExtras = {state: {example: visite}};
this.route.navigate(['/technecien/startVisite'],navigationExtras);
}


}
