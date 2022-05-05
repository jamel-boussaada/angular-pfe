import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAvionComponent } from './add-avion/add-avion.component';
import { ListAvionComponent } from './list-avion/list-avion.component';
import { Route, RouterModule } from '@angular/router';
import { LelementDeLearonefComponent } from './list-avion/lelement-de-laeronef/lelement-de-learonef.component';
import { LesDocumentsTechniquesComponent } from './list-avion/les-documents-techniques/les-documents-techniques.component';
import { TableauDeBordComponent } from './list-avion/tableau-de-bord/tableau-de-bord.component';
import { TraveauxSupplementairesComponent } from './list-avion/traveaux-supplementaires/traveaux-supplementaires.component';
import { MatTabsModule } from '@angular/material/tabs';
import { VolsComponent } from './list-avion/vols/vols.component';
import { MatTableModule } from '@angular/material/table';
import { LesVisites1Component } from './list-avion/les-visites1/les-visites1/les-visites1.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { DialogAddVisiteComponent } from './list-avion/dialog-add-visite/dialog-add-visite.component';
import {MatDialogModule} from '@angular/material/dialog';
import { OperationDialogComponent } from './list-avion/operation-dialog/operation-dialog.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ProgrammeEntretienComponent } from './programme-entretien/programme-entretien.component';
import { ReservasionDialogComponent } from './reservation/reservasion-dialog/reservasion-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import { FileManagerComponent } from 'app/modules/ingenieur/file-manager/file-manager.component';
import { FileManagerModule } from './file-manager/file-manager.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { DialogProgrammeEntretienComponent } from './dialog-programme-entretien/dialog-programme-entretien.component';

const ingenieurRoute: Route[] = [
    // {
    //     path: 'addAvion',
    //     component: AddAvionComponent,
    // },
];

@NgModule({
    declarations: [AddAvionComponent, ListAvionComponent, LelementDeLearonefComponent, LesDocumentsTechniquesComponent, TableauDeBordComponent,
         TraveauxSupplementairesComponent,
         VolsComponent,
         LesVisites1Component,
         DialogAddVisiteComponent,
         OperationDialogComponent,
         ReservationComponent,
         ProgrammeEntretienComponent,
         ReservasionDialogComponent,
         DialogProgrammeEntretienComponent,

        ],
    imports: [CommonModule,
        MatTabsModule,
        MatTableModule,
         RouterModule.forChild(ingenieurRoute),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatDialogModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatGridListModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatCardModule,

        SharedModule],
    exports: [AddAvionComponent, ListAvionComponent,ReservasionDialogComponent],
})
export class IngenieurModule {}
