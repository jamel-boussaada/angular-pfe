import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AvionService } from 'app/shared/services/avion.service';
import { VolService } from 'app/shared/services/vol.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reservasion-dialog',
  templateUrl: './reservasion-dialog.component.html',
  styleUrls: ['./reservasion-dialog.component.scss']
})

export class ReservasionDialogComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    reservasionForm!: FormGroup;
    avions;
    year: string;
    month: string;
    day: string;
res;
  constructor( @Inject(MAT_DIALOG_DATA) public editdata: any,
  private matDiallogRef: MatDialogRef<ReservasionDialogComponent>,
  private formBuilder: FormBuilder,
  private avionService: AvionService,
  private volService: VolService,
  private _snackBar: MatSnackBar,

  ){}



  ngOnInit(): void {

this.getAllAvion();
    this.reservasionForm = this.formBuilder.group({
        avion: [],
        dateReservation: ['', Validators.required],
        pilote: ['', Validators.required],
        instructeur: [, Validators.required],
        durer: ['', Validators.required],
        depart: ['', Validators.required],
        arriver: ['', Validators.required],
        att: [, Validators.required],
    });


 }


 getAllAvion(): void{
    this.avionService.getAllAvion().subscribe((data) => {
        this.avions=data;
        console.log(data);
    });
 }

  reset(): void {
    this.matDiallogRef.close('save');
}
getReservasion(): void{


    this.avions.forEach((res)=>{


  console.log(res);
    if(res.immatriculation === this.reservasionForm.value.avion)
    {


    //    this.addAvion= JSON.parse(data.toString());
        // console.log(data);


     this.reservasionForm.value.avion ='/api/avions/'+res.id;
        // this.reservasionForm.value.avion =res;

    }
    });

    this.reservasionForm.value.att=Number(this.reservasionForm.value.att);
this.year =this.reservasionForm.value.dateReservation._i.year;
this.month =this.reservasionForm.value.dateReservation._i.month;
this.day =this.reservasionForm.value.dateReservation._i.date;


    this.reservasionForm.value.dateReservation=this.year+'-'+this.month+'-'+this.day;

    console.log(this.reservasionForm.value);
    this.volService.addReservasion(this.reservasionForm.value).subscribe((data)=>{
console.log(data);
    });

    this._snackBar.open(
        'votre reservasion a été ajouter avec succes ',
        'Undo',
        {
            duration: 3000,
        }
    );
this.reset();

}




getFormFieldHelpersAsString(): string
{
    return this.formFieldHelpers.join(' ');
}
}
