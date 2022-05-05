import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisiteTechnecienComponent } from './visite-technecien/visite-technecien.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { StartVisiteComponent } from './start-visite/start-visite.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    VisiteTechnecienComponent,
    StartVisiteComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    SharedModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class TechnecienModule { }
