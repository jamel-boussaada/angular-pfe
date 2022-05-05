import { StartVisiteComponent } from './modules/technecien/start-visite/start-visite.component';
import { TestComponent } from './test/test.component';
import { VisiteTechnecienComponent } from './modules/technecien/visite-technecien/visite-technecien.component';
import { ProgrammeEntretienComponent } from './modules/ingenieur/programme-entretien/programme-entretien.component';
import { IngenieurModule } from './modules/ingenieur/ingenieur.module';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver, IngenieurResolver, TechnecienReslover } from 'app/app.resolvers';
import { AddAvionComponent } from './modules/ingenieur/add-avion/add-avion.component';
import { ListAvionComponent } from './modules/ingenieur/list-avion/list-avion.component';
import { ReservationComponent } from './modules/ingenieur/reservation/reservation.component';
import { RoleComponent } from './modules/role/role.component';

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    { path: '', pathMatch: 'full', redirectTo: 'login/sign-in' },
    // { path: 'ingenieur', pathMatch: 'full', redirectTo: 'ingenieur/listAvion' },

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'lescomptes' },

    // Auth routes for guests
    {
        path: 'login',
        // canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then(m => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then(m => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        m => m.AuthSignInModule
                    ),
            },
        ],
    },

    //TODO Auth routes for authenticated users
    {
        path: '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        m => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then(m => m.AuthUnlockSessionModule),
            },
        ],
    },
    //TODO ingenieur routes
    {
        path: 'technecien',
        component: LayoutComponent,
        resolve: {
            initialData: TechnecienReslover,
        },

        children: [
            {
                path: 'tech',
                loadChildren: () =>
                    import('app/modules/technecien/technecien.module').then(
                        m => m.TechnecienModule
                    ),
            },
            {

                path: 'visite',
                component: VisiteTechnecienComponent,
            },
            {

                path: 'startVisite',
                component:StartVisiteComponent,
            },
            // {
            //     path: 'listAvion',
            //     component: ListAvionComponent,
            // },
            // {
            //     path: 'reservation ',
            //     component: ReservationComponent,
            // },
            // {
            //     path: 'programme ',
            //     component: ProgrammeEntretienComponent,
            // },
        ],
    },
    //TODO Admin routes
    {
        path: 'admin',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: { id: 'admin' },
        children: [
            {
                path: 'compte',
                loadChildren: () =>
                    import(
                        'app/modules/admin/dashboards/lescomptes/lescomptes.module'
                    ).then(m => m.LesComptesModule),
            },
        ],
    },


    {
        path: 'admin',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: { id: 'admin' },
        children: [
            {
                path: 'compte',
                loadChildren: () =>
                    import(
                        'app/modules/admin/dashboards/lescomptes/lescomptes.module'
                    ).then(m => m.LesComptesModule),
            },
        ],
    },
    {
        path: 'ingenieur',
        component: LayoutComponent,
        resolve: {
            initialData: IngenieurResolver,
        },

        children: [

            {
                path: 'go',
                loadChildren: () =>
                    import(
                        'app/modules/ingenieur/ingenieur.module'
                    ).then(m => m.IngenieurModule),
            },
            // {
            //     path: 'file',
            //     loadChildren: () =>
            //         import(
            //             'app/modules/ingenieur/file-manager/file-manager.module'
            //         ).then(m => m.FileManagerModule),
            // },

            {
                path: 'listAvion',
                component: ListAvionComponent,
            },
            {
                path: 'listAvion/:id',
                component: ListAvionComponent,
            },
            {
                path: 'reservation',
                component: ReservationComponent,
            },
            {
                path: 'programme',
                component: ProgrammeEntretienComponent,
            },
            {
                path: 'programme/:id',
                component: ProgrammeEntretienComponent,
            },
            {
                path: 'addAvion',
                component: AddAvionComponent,
            },

        ],
    },

    {path: 'app', children: [

        {path: 'dialog', loadChildren: () => import('app/modules/ingenieur/scrumboard/scrumboard.module').then(m => m.ScrumboardModule)},
     ]},


     {
        path: 'role',
        component: RoleComponent,
    },
    {
        path: 'test',
        component: TestComponent,
    },

];
