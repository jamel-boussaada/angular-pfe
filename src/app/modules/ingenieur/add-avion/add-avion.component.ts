import { AvionService } from 'app/shared/services/avion.service';
import { ComposantService } from './../../../shared/services/composant.service';
import { ModeleService } from './../../../shared/services/modele.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstructeurService } from 'app/shared/services/constructeur.service';
import { TypeComposantService } from 'app/shared/services/type-composant.service';

@Component({
    selector: 'app-add-avion',
    templateUrl: './add-avion.component.html',
    styleUrls: ['./add-avion.component.scss'],
})
export class AddAvionComponent implements OnInit {
    @Input()label: string='check me';
    isLinear = false;
    constructGroupForm: FormGroup;
    modeleGroupForm: FormGroup;
    newConstructGroupForm: FormGroup;
    newModeleGroupForm: FormGroup;
    avionFormGroup: FormGroup;
    composantFormGroup: FormGroup;
    deuxiemecomposantFormGroup: FormGroup;
    isLoading: boolean = false;
    condition = true;
    construct = [];
    model = [];
    typeComposant = [];
    disabled = false;
    oldModel=false;
    finalConstruct;
    finalModel;
    m;
    c;
    lastConstructeurId: number;
    affectation: false;

    lastModelId: number;
    lastAvionId: number;

    searchInputControl: FormControl = new FormControl();
    constructor(
        private _formBuilder: FormBuilder,
        private constructeurService: ConstructeurService,
        private modelService: ModeleService,
        private composantService: ComposantService,
        private typeComposantService: TypeComposantService,
        private avionService: AvionService
    ) {}

    ngOnInit(): void {
        this.getAllConstructer();
        this.getAllModel();
        this.getAllTypeComposant();

        this.constructGroupForm = this._formBuilder.group({
            nomConstructeur: ['', Validators.required],
        });
        this.modeleGroupForm = this._formBuilder.group({
            nomModele: ['', Validators.required],

        });
        this.newConstructGroupForm = this._formBuilder.group({
            nomConstructeur: ['', Validators.required],

        });
        this.newModeleGroupForm = this._formBuilder.group({
            nomModele: ['', Validators.required],
            constructeur:[],
        });

        this.avionFormGroup = this._formBuilder.group({
            numderoSerie: [''],
            dateFabrication: [''],
            dateProcheneVisiteCEN: [''],
            dateProcheneEcheance: [''],
            dateProcheneEcheancePesseé: [''],
            immatriculation: ['', Validators.required],
            modele: ['', Validators.required],
            fHGV: [''],
            fHNEW: [''],


        });

        this.composantFormGroup = this._formBuilder.group({
            nomComposant: ['', Validators.required],
            serialNumber: ['', Validators.required],
            dateDeFabrication: ['', Validators.required],
            fHnew: ['', Validators.required],
            dateProcheneEcheanceGV: ['', Validators.required],
            constructeur: ['', Validators.required],
            partNumber: ['', Validators.required],
            typeComposant: ['', Validators.required],
            // equipements: ['', Validators.required],
            avions: ['', Validators.required],

        });
        this.deuxiemecomposantFormGroup = this._formBuilder.group({
            nomComposant: ['', Validators.required],
            serialNumber: ['', Validators.required],
            dateDeFabrication: ['', Validators.required],
            fHnew: ['', Validators.required],
            dateProcheneEcheanceGV: ['', Validators.required],
            constructeur: ['', Validators.required],
            partNumber: ['', Validators.required],
            typeComposant: ['', Validators.required],
            // equipements: ['', Validators.required],
            avions: ['', Validators.required],

        });
    }

    getAllConstructer(): void {
        this.constructeurService.getAllConstructer().subscribe((c) => {
            console.log(c);
            this.construct = c;
        });
    }

    getAllModel(): void {
        this.modelService.getAllModele().subscribe((m) => {
            console.log(m);
            this.model = m;
        });
    }

    getAllTypeComposant(): void {
        this.typeComposantService.alltypeComposant().subscribe((t) => {
            console.log(t);
            this.typeComposant = t;
        });
    }


    addConstruct(): void {
        if(this.constructGroupForm.value.nomConstructeur !== ''){
            // alert('old constructer');
            this.c=1;
            this.finalConstruct=this.constructGroupForm.value;
            }else{
                // alert('new constructer');
                this.finalConstruct=this.newConstructGroupForm.value;
                this.c=2;
                this.constructeurService.addConstructeur(this.newConstructGroupForm.value).subscribe();


            }
            this.ajouterModele();
    }





ajouterModele(): void{

    if(this.modeleGroupForm.value.nomModele !== ''){
        // alert('old model');

        this.finalModel=this.modeleGroupForm.value;
        this.m='oldModel';
        }else{
            // alert('new model');
        this.finalModel=this.newModeleGroupForm.value;
        this.m='newModel';

            this.constructeurService.getConstructerByName().subscribe((x)=>{
                this.lastConstructeurId=x;
                this.newModeleGroupForm.value.constructeur ='/api/constructeurs/'+String(x);
                this.modelService.addModele(this.newModeleGroupForm.value).subscribe();
            });
        }

}
    ajouterAvion(): void {

//    console.log(this.constructGroupForm.value);
//    console.log(this.modeleGroupForm.value);
//    console.log(this.newConstructGroupForm.value);
//    console.log(this.newModeleGroupForm.value);
//    console.log(this.composantFormGroup.value);
//    console.log(this.deuxiemecomposantFormGroup.value);
// this.constructeurService.addConstructeur()



// console.log(this.finalModel);
// console.log(this.finalConstruct);
// alert(this.c);
// alert(this.m);
    }
addAvion(): void{
    this.avionFormGroup.value.dateFabrication=String(this.avionFormGroup.value.dateFabrication._i.year)+'/'+String(this.avionFormGroup.value.dateFabrication._i.month)+'/'+String( this.avionFormGroup.value.dateFabrication._i.date);
    this.avionFormGroup.value.dateProcheneVisiteCEN=String(this.avionFormGroup.value.dateProcheneVisiteCEN._i.year)+'/'+String(this.avionFormGroup.value.dateProcheneVisiteCEN._i.month)+'/'+String( this.avionFormGroup.value.dateProcheneVisiteCEN._i.date);
    this.avionFormGroup.value.dateProcheneEcheance=String(this.avionFormGroup.value.dateProcheneEcheance._i.year)+'/'+String(this.avionFormGroup.value.dateProcheneEcheance._i.month)+'/'+String( this.avionFormGroup.value.dateProcheneEcheance._i.date);
    this.avionFormGroup.value.dateProcheneEcheancePesseé=String(this.avionFormGroup.value.dateProcheneEcheancePesseé._i.year)+'/'+String(this.avionFormGroup.value.dateProcheneEcheancePesseé._i.month)+'/'+String( this.avionFormGroup.value.dateProcheneEcheancePesseé._i.date);

console.log( this.avionFormGroup.value);

    if (this.m=== 'oldModel'){

    this.avionFormGroup.value.modele= '/api/modeles/'+String(this.finalModel.id);
    this.avionService.addAvion(   this.avionFormGroup.value).subscribe((x)=>{

});
}else if (this.m === 'newModel'){



this.modelService.lastModelId().subscribe((x)=>{
// this.lastModelId=x;
this.avionFormGroup.value.modele= '/api/modeles/'+String(x);
// alert(x);
this.avionService.addAvion(   this.avionFormGroup.value).subscribe((y)=>{

});

});


}
// alert(this.m);
// this.avionService.addAvion(   this.avionFormGroup.value).subscribe((x)=>{

// });
}

ajoutPremierComposant(): void{
   console.log(this.composantFormGroup.value);
   this.composantFormGroup.value.dateDeFabrication=String(this.composantFormGroup.value.dateDeFabrication._i.year)+'/'+String(this.composantFormGroup.value.dateDeFabrication._i.month)+'/'+String( this.composantFormGroup.value.dateDeFabrication._i.date);
   this.composantFormGroup.value.dateProcheneEcheanceGV=String(this.composantFormGroup.value.dateProcheneEcheanceGV._i.year)+'/'+String(this.composantFormGroup.value.dateProcheneEcheanceGV._i.month)+'/'+String( this.composantFormGroup.value.dateProcheneEcheanceGV._i.date);
   this.avionService.getLastAvionAdedId().subscribe((x)=>{
    this.lastAvionId=x;

        const typeVisiteId =    this.composantFormGroup.value.typeComposant;
        this.composantFormGroup.value.typeComposant='/api/type_composants/'+typeVisiteId;
            this.composantFormGroup.value.avions='/api/avions/'+String(x);
            // this.composantFormGroup.value.constructeur ='/api/constructeurs/'+String(y);
            this.composantService.addComposant(this.composantFormGroup.value).subscribe();

});

}


ajoutDeuxiemeComposant(): void{
    console.log(this.deuxiemecomposantFormGroup.value);


    this.deuxiemecomposantFormGroup.value.dateDeFabrication=String(this.deuxiemecomposantFormGroup.value.dateDeFabrication._i.year)+'/'+String(this.deuxiemecomposantFormGroup.value.dateDeFabrication._i.month)+'/'+String( this.deuxiemecomposantFormGroup.value.dateDeFabrication._i.date);
    this.deuxiemecomposantFormGroup.value.dateProcheneEcheanceGV=String(this.deuxiemecomposantFormGroup.value.dateProcheneEcheanceGV._i.year)+'/'+String(this.deuxiemecomposantFormGroup.value.dateProcheneEcheanceGV._i.month)+'/'+String( this.deuxiemecomposantFormGroup.value.dateProcheneEcheanceGV._i.date);
    this.avionService.getLastAvionAdedId().subscribe((x)=>{
     this.lastAvionId=x;

         const typeVisiteId =    this.deuxiemecomposantFormGroup.value.typeComposant;
         this.deuxiemecomposantFormGroup.value.typeComposant='/api/type_composants/'+typeVisiteId;
             this.deuxiemecomposantFormGroup.value.avions='/api/avions/'+String(x);
             // this.composantFormGroup.value.constructeur ='/api/constructeurs/'+String(y);
             this.composantService.addComposant(this.deuxiemecomposantFormGroup.value).subscribe();

 });
 }

}





