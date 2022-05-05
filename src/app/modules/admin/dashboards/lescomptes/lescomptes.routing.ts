import { Route } from '@angular/router';
import { ListeDesComptesComponent } from 'app/modules/admin/dashboards/lescomptes/listedescomptes/listedescomptes.component';
import { ListeComponent } from 'app/modules/admin/dashboards/lescomptes/listedescomptes/liste/listedescomptes.component';

export const lescomptesRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listedescomptes',
    },
    {
        path: 'listedescomptes',
        component: ListeDesComptesComponent,
        children: [
            {
                path: '',
                component: ListeComponent,
            },
        ],
        /*children : [
            {ListeComponent
                path     : '',
                component: ContactsListComponent,
                resolve  : {
                    tasks    : ContactsResolver,
                    countries: ContactsCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ContactsDetailsComponent,
                        resolve      : {
                            task     : ContactsContactResolver,
                            countries: ContactsCountriesResolver
                        },
                        canDeactivate: [CanDeactivateContactsDetails]
                    }
                ]
            }
        ]*/
    },
];
