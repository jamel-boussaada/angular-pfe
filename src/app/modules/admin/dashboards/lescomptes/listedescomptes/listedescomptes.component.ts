import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'listedescomptescomptes',
    templateUrl    : './listedescomptes.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListeDesComptesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
