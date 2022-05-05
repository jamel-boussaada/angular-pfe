import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgrammeEntretienModule } from './modules/programme-entretien/programme-entretien.module';
import { TechnecienModule } from './modules/technecien/technecien.module';
import { IngenieurModule } from './modules/ingenieur/ingenieur.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScrumboardCardDetailsComponent } from './modules/ingenieur/scrumboard/card/details/details.component';
import { ScrumboardComponent } from './modules/ingenieur/scrumboard/scrumboard.component';
import { ScrumboardBoardAddListComponent } from './modules/ingenieur/scrumboard/board/add-list/add-list.component';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { RoleComponent } from './modules/role/role.component';
import { TestComponent } from './test/test.component';
import {  HttpHeaders } from '@angular/common/http';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent, RoleComponent, TestComponent,],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        //angular matriel
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,
        ReactiveFormsModule,
        FormsModule,


        // Layout module of your application
        LayoutModule,
        IngenieurModule,
        TechnecienModule,
        ProgrammeEntretienModule,
        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
    ],
    bootstrap: [AppComponent],
    exports: [MatTableModule,RouterModule],
    providers:[
{
provide: HTTP_INTERCEPTORS,
useClass:   AuthInterceptor,
multi:true
}
    ]
})
export class AppModule {}
