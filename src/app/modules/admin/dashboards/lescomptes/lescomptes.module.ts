import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { ListeDesComptesComponent } from 'app/modules/admin/dashboards/lescomptes/listedescomptes/listedescomptes.component';
import { lescomptesRoutes } from 'app/modules/admin/dashboards/lescomptes/lescomptes.routing';
import { DialogComponent } from './dialog/dialog.component';
import { MatTableModule } from '@angular/material/table';
import { ListeComponent } from 'app/modules/admin/dashboards/lescomptes/listedescomptes/liste/listedescomptes.component';

@NgModule({
    declarations: [ListeDesComptesComponent, DialogComponent,ListeComponent],
    imports: [
        RouterModule.forChild(lescomptesRoutes),
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
        SharedModule,
        MatTableModule,
    ],
    exports: [],
})
export class LesComptesModule {}
