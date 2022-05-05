import { ComposantService } from 'app/shared/services/composant.service';
import { ProgrammeEntretienService } from './../../../shared/services/programme-entretien.service';
import { TypeComposantService } from './../../../shared/services/type-composant.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModeleService } from 'app/shared/services/modele.service';

@Component({
  selector: 'app-dialog-programme-entretien',
  templateUrl: './dialog-programme-entretien.component.html',
  styleUrls: ['./dialog-programme-entretien.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class DialogProgrammeEntretienComponent implements OnInit {
    programmeFormGroup: FormGroup;
    secondFormGroup: FormGroup;
allModel;

    iteration=[1];

  constructor(private _formBuilder: FormBuilder,
    private typeComposantService: TypeComposantService,
    private modelService: ModeleService,
    private programmeEntretienService: ProgrammeEntretienService,
private composantService: ComposantService,

    ) {

    this.secondFormGroup = new FormGroup({

        nomOperation: new FormControl(''),
        a: new FormControl(''),
        b: new FormControl(''),
        c: new FormControl(''),
      });

  }

  ngOnInit(): void {
    this.programmeFormGroup = this._formBuilder.group({
        nomProgrammeEntretien: ['', Validators.required],
        modele: ['', Validators.required],
      });
    //   this.secondFormGroup = this._formBuilder.group({
    //     secondCtrl: ['', Validators.required],
    //   });
      const op = new FormArray([
        new FormControl(''),
        new FormControl('')
      ]);


this.modelService.getAllModele().subscribe((x)=>{
this.allModel=x;

});







    }

    ajouter(): void{
        // alert(this.iteration);
        console.log(this.secondFormGroup.value);
this.iteration.push(this.secondFormGroup.value);
console.log(this.iteration);





    }
    ajoutTraveaux(): void{
        const formValues = {...this.secondFormGroup.value};
        this.programmeFormGroup.value.modele='/api/modeles/'+String(this.programmeFormGroup.value.modele);
// this.programmeEntretienService.addProgEntretien(this.programmeFormGroup.value).subscribe((x)=>{

// });
        console.log(  this.programmeFormGroup.value );

    }
}
