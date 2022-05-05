import { VisiteService } from './../../../../shared/services/visite.service';
import { AvionService } from 'app/shared/services/avion.service';
import { TraveauSupplimentaireService } from './../../../../shared/services/traveau-supplimentaire.service';
import {
    Component,
    Inject,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsigneService } from 'app/shared/services/consigne.service';

@Component({
    selector: 'app-operation-dialog',
    templateUrl: './operation-dialog.component.html',
    styleUrls: ['./operation-dialog.component.scss'],
})
export class OperationDialogComponent implements OnInit {

    toppings = new FormControl();
    toppingList: string[] = [];
    traveau: any;
    idAvion = '';
    idVisite;
    succes = true;
    modele;
    idModele;
    consigne;
    visite;
    data;

select=false;
    avionForm!: FormGroup;
    constructor(
        @Inject(MAT_DIALOG_DATA) public editdata: any,
        private matDiallogRef: MatDialogRef<OperationDialogComponent>,
        private formBuilder: FormBuilder,
        private traveauSupp: TraveauSupplimentaireService,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private avionService: AvionService,
        private consigneService: ConsigneService,
        private  visiteService: VisiteService
    ) {}

    ngOnInit(): void {
// alert(this.editdata.idVisite);
        // console.log(this.editdata.operation);
        //    console.log(this.editdata.idAvion);
        const idAvion = this.editdata.idAvion.split('/');

        this.idAvion = idAvion[3];
        // alert(this.idAvion);
        this.traveauSupp
            .getTraveauByAvion(Number(this.idAvion))
            .subscribe((data) => {
                // console.log(data);
                this.traveau = data;
                // alert(data.commantaire);
                this.toppingList.push(data[0].commantaire);

                // alert(this.toppingList);
            });
            this.getConsigneByModel();
    }

    reset(): void {
        this.matDiallogRef.close('save');
    }
    getAvionAvion(): void {}

    ajouterTravailSupp(): void {
        // console.log(this.traveau);
        this.traveau.forEach((data) => {
            // console.error(data);
            // alert(this.toppings.value);
            alert(data.commantaire !== this.toppings.value);
            if (data.commantaire !== this.toppings.value) {
                this.idVisite = data.id;
                alert(this.idVisite);
            }

            // alert(this.editdata.idVisite);
        });
        const apiVisite = {
            visite: '/api/visites/' + String(this.editdata.idVisite),
        };
        // console.error(this.toppings.value);

        this.traveauSupp
            .setVisiteTotraveau(this.idVisite, apiVisite)
            .subscribe((data) => {});
        this._snackBar.open(
            'votre traveau supplimentaire a été ajouter a cette visite',
            'Undo',
            {
                duration: 3000,
            }
        );



    }

getConsigneByModel(): void{
    this.avionService.getAvionById(Number(this.idAvion)).subscribe((x)=>{

        this.modele =x.modele;


        const idModele =this.modele.split('/');
        // alert(idModele[3]);

        this.consigneService.getConsigneByModele(Number(idModele[3])).subscribe((y)=>{
console.log(y);
this.consigne=y;


        });

    });
}



 onChecked(obj: any, isChecked: boolean): any{
    // alert(obj); // {}, true || false
    // alert(isChecked);
    if (isChecked === true){
        // alert(obj.object);
        this.visiteService.oneViste(Number(this.editdata.idVisite)).subscribe((x)=>{

console.log(x.operations);

this.visite =x;
this.visite.operations.push(obj.objet);
this.data ={'operation':this.visite.operations};
console.error(JSON.parse(JSON.stringify(this.data)));
this.visiteService.updateVisiteOperations(this.visite.id,this.visite.operations).subscribe((res)=>{
console.log(res);
});
        });
        }
      }
ajouterConsigne(): void{
    // console.info(this.editdata.idAvion);

    this._snackBar.open(
        'votre consigne de navigabilité a été ajouter avec succes ',
        'Undo',
        {
            duration: 3000,
        }
    );
}

    // alert(this.idAvion);

// this.checkCheckBoxvalue(event);




}
