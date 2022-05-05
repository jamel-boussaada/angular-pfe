import { DialogProgrammeEntretienComponent } from './../dialog-programme-entretien/dialog-programme-entretien.component';
import { ProgrammeEntretienService } from './../../../shared/services/programme-entretien.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { URL } from 'url';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-programme-entretien',
  templateUrl: './programme-entretien.component.html',
  styleUrls: ['./programme-entretien.component.scss']
})
export class ProgrammeEntretienComponent implements OnInit {
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
  idAvion='';
  allProg;
  constructor(private router: Router,
    private programmeService: ProgrammeEntretienService,
    public dialog: MatDialog
    ) {
    // router.events.subscribe((val) => {
    //     const pathArray = window.location.pathname.split('/');
    //     this.idAvion=pathArray[3];
    // });

this.programmeService.getAllProgramme().subscribe((val)=>{
this.allProg=val;
console.log(this.allProg);
});

   }

  ngOnInit(): void {
  }


  openDialog(): void{
    const dialogRef = this.dialog.open(DialogProgrammeEntretienComponent,
        {
            // data:operation.operations,

            width: '90%',


                    },
        );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
