import { VisiteService } from './../../../../shared/services/visite.service';
import { AvionService } from './../../../../shared/services/avion.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { json } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-dialog-add-visite',
  templateUrl: './dialog-add-visite.component.html',
  styleUrls: ['./dialog-add-visite.component.scss']
})
export class DialogAddVisiteComponent implements OnInit {
avion;
avions;
addAvion: any;
avionForm!: FormGroup;
  constructor(  private matDiallogRef: MatDialogRef<DialogAddVisiteComponent>,
    private avionService: AvionService,
    private formBuilder: FormBuilder,
    private visiteService: VisiteService
    ) { }

  ngOnInit(): void {
    this.avionForm = this.formBuilder.group({
        immatriculation: [''],

        // nom: ['']
    });
//Todo get all avion
      this.avionService.getAllAvion().subscribe((data) => {
          this.avions=data;
          console.log(data);
      });
  }
  getAvionAvion(): void{

console.log( this.avionForm.value.immatriculation);
this.avions.forEach((data)=>{
console.log(data);
if(data.immatriculation === this.avionForm.value.immatriculation )
{
//    this.addAvion= JSON.parse(data.toString());
    // console.log(data);

    console.log(data);
    console.log(data.composants[0]);
this.visiteService.vsisiteInitial(data).subscribe((res) =>{
    // alert(res);

}
);
}
});



  }

  reset(): void {
    this.matDiallogRef.close('save');
}
}
