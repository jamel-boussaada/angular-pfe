import { OperationDialogComponent } from './../../operation-dialog/operation-dialog.component';
import { DialogAddVisiteComponent } from './../../dialog-add-visite/dialog-add-visite.component';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {LesVistes1Service } from 'app/modules/ingenieur/list-avion/les-visites1/les-visites1/les-visites1.service';
import {VisiteStatus, VisitePagination, VisiteTypeVisite, Visite } from 'app/modules/ingenieur/list-avion/les-visites1/les-visites1/les-visites1.types';
import { VisiteService } from 'app/shared/services/visite.service';
import {MatDialog} from '@angular/material/dialog';
import { UserService } from 'app/shared/services/user.service';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
    selector       : 'app-les-visites1',
    templateUrl    : './les-visites1.component.html',
    styles         : [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class LesVisites1Component implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

         newVisite = {
            id:'',
    typevisite:'',
    resultatvisite: '',
    datevisite: '',
    intervenant: '',
    autorisation: '',
    heureTotale: '',
    tolerance: '',
    dateVisite: '',
    dateButeé: '',
    heureButeé: '',
    nBill: '',
    nomIngenieur: '',
    /* operationss: ['', [Validators.required]], */
    potentielProchainVisite: '',
    resultatVisite: '',
    status: '',
    typeVisite: '',
                };

    visites: Observable<Visite[]>;
    idViste: number;
    status: VisiteStatus[];
    type: VisiteTypeVisite[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: VisitePagination;
    searchInputControl: FormControl = new FormControl();
    selectedVisite: Visite | null = null;
    selectedVisiteForm: FormGroup;
    vis;
    tech;
    userInstervenant;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _lesvisites1Service: LesVistes1Service,
        private visiteService: VisiteService,
        private userService: UserService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------








    /**
     * On init
     */
    ngOnInit(): void
    {
            // Create the selected visite form
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.selectedVisiteForm = this._formBuilder.group({

            id:['', [Validators.required]],
    /* typevisite: ['', [Validators.required]], */
 /* resultatvisite: ['""', [Validators.required]], */
/* avion:[], */
    intervenant: ['', [Validators.required]],
    autorisation: ['', [Validators.required]],
    heureTotale: ['', [Validators.required]],
    tolerance: ['', [Validators.required]],
    dateVisite: [''],
    dateButeé: ['', [Validators.required]],
    heureButer: ['', [Validators.required]],
    nBill: ['', [Validators.required]],
    nomIngenieur: ['', [Validators.required]],
     operationss: [''],
    potentielProchainVisite: ['', [Validators.required]],
    resultatVisite: ['', [Validators.required]],
    status: ['', [Validators.required]],
    typeVisite: ['', [Validators.required]],
    /* traveauSupplimentaires: ['', [Validators.required]], */
        }),


        //getUserTechnecien
this.userService.getUserTech().subscribe((x)=>{
this.tech=x;
console.log(this.tech);
});



            // Get the type
        this._lesvisites1Service.type$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((type: VisiteTypeVisite[]) => {

                // Update the type
                this.type = type;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

         // Get the pagination
        this._lesvisites1Service.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: VisitePagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


 this.visiteService.getAllVisites().subscribe({
        next: (res) => {
            this.visites=res;
            console.log(this.visites);
            },
            error: () => {
                alert('error');
            },
        });
        console.log( this.visites);
        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._lesvisites1Service.getVisites(0, 5, 'name', 'asc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
    }

    sheckOperation(operation: any): void{
        console.log(operation.operations);
        this.dialog.open(OperationDialogComponent,
            {
data:{
operation:operation.operations,
idAvion:operation.avion,
idVisite:operation.id
},

width: '1300px',
height:'500px'
            },





            );



    }

    /**
     * After view init
     */

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngAfterViewInit(): void
    {
        /* if ( this._sort && this._paginator )
        {
            // Set the initial sort
            this._sort.sort({
                id          : 'name',
                start       : 'asc',
                disableClear: true
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get visites if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._lesvisites1Service.getVisites(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        } */
    }
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnDestroy(): void
    {
        /* // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete(); */
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
/*** Toggle visite details
     *
     * @param visiteId
     */
 toggleDetails(visiteId: any): void
    {
        // If the visite is already selected...
        if ( this.selectedVisite && this.selectedVisite.id === visiteId )
        {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the visite by id

       this.idViste = Number(visiteId);
        this.visiteService.oneViste( this.idViste).subscribe({
            next: (data) => {

            console.log(data);
            // Set the selected visite
                this.selectedVisite = data;
                console.log(this.selectedVisite);

                // Fill the form
                this.selectedVisiteForm.patchValue(data);
                console.log(this.selectedVisiteForm.patchValue(data));

                // Mark for check
                this._changeDetectorRef.markForCheck();
            },
            error: () => {
                alert('error');
            }
        });




    }


    /**
     * Close the details
     */
    closeDetails(): void
    {
        this.selectedVisite = null;
    }

    /**
     * Create Visite
     */
     createVisite(): void
    {
        this.dialog.open(DialogAddVisiteComponent);

    }

    /**
     * Update the selected Visite using the form data
     */
     updateSelectedVisite(): void
    {
        // Get the Visite object
        const idIntervenant =this.selectedVisiteForm.getRawValue().intervenant;
        const visite = this.selectedVisiteForm.getRawValue();
/* console.log(visite); */
/* this.userService.getUserByid(Number(idIntervenant)).subscribe((x) =>{
    /* visite.intervenant=x.nom; */
    /* this.userInstervenant=x;
        visite.intervenant=    this.userInstervenant.nom;
        console.log(visite);  */

this.visiteService.updateViste(visite.id,visite).subscribe((y) =>{
console.log(y);
this.showFlashMessage('success');
/* }); */

} );
        /* // Update the Visite on the server
        this._lesvisites1Service.updateVisite(visite.id, visite).subscribe(() => {

            // Show a success message
            this.showFlashMessage('success');
        }); */
    }


    /**
     * Delete the selected Visiteusing the form data
     */
     deleteSelectedVisite(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'visite supprimé',
            message: 'vous voulez vraiment supprimé cette visite ? ',
            actions: {
                confirm: {
                    label: 'supprimé'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {

                // Get the Visite object
                const visite = this.selectedVisiteForm.getRawValue();

                // Delete the Visite on the server
                this._lesvisites1Service.deleteVisite(visite.id).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }



     /* Update the selected product using the form data */

         updateSelectedProduct(): void {
        // Get the product object
        const visite = this.selectedVisiteForm.getRawValue();

        // Remove the currentImageIndex field
        delete visite.currentImageIndex;

        // Update the product on the server
        /* this._inventoryService
            .updateProduct(product.id, product)
            .subscribe(() => {
                // Show a success message
                this.showFlashMessage('success');
            }); */
    }
    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void
    {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }



}
