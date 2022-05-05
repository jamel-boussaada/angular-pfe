import { OperationDialogComponent } from './../../../modules/ingenieur/list-avion/operation-dialog/operation-dialog.component';
/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'admin',
        title: 'Tableau de bord',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'admin',
                title: 'Les comptes',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/admin/compte',
            },
        ],
    },
    {
        id: 'ingenieur',
        title: '',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        active: true,

        children: [
    //         {

    //    id: 'ingenieur',
    //             title: 'liste avion',
    //             type: 'basic',
    //             icon: 'heroicons_outline:clipboard-check',
    //             link: '/ingenieur/listAvion',

    //         },
            {
                id: '2',
                title: 'ajouter avion',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/ingenieur/addAvion',
            },
            {
                id: 'res',
                title: 'ajouter reservation ',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/ingenieur/reservation',
            },
            {
                id: 'ingenieur',
                title: 'programme entretien ',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/ingenieur/programme',
            },

        ],
    },
    {
        id: 'technecien',
        title: 'Tableau de bord',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'technecien',
                title: 'visites',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/technecien/visite',
            },
        ],
    },
    {
        id: 'ingenieur',
        title: 'MES  AEROEF',
        subtitle: 'ingenieur',
        type: 'collapsable',
        icon: 'mat_solid:airplanemode_active',
        active: true,

        children: [

        ]},
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'aside',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'ingenieur',
                title: 'liste avion',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/addAvion',
            },
            {
                id: 'ingenieur',
                title: 'ajouter avion',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/listAvion',
            },
        ], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
