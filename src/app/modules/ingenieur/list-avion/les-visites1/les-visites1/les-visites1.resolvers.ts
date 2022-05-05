import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { LesVistes1Service } from 'app/modules/ingenieur/list-avion/les-visites1/les-visites1/les-visites1.service';
import {VisiteStatus, VisitePagination, VisiteTypeVisite, Visite } from 'app/modules/ingenieur/list-avion/les-visites1/les-visites1/les-visites1.types';

@Injectable({
    providedIn: 'root'
})
export class VisiteStatusResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _lesvisitesService: LesVistes1Service)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VisiteStatus[]>
    {
        return this._lesvisitesService.getStatus();
    }
}

@Injectable({
    providedIn: 'root'
})
export class VisiteTypeVisiteResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _lesvisites1Service: LesVistes1Service)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VisiteTypeVisite[]>
    {
        return this._lesvisites1Service.getType();
    }
}

@Injectable({
    providedIn: 'root'
})
export class VisiteResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _lesvisites1Service: LesVistes1Service,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Visite>
    {
        return this._lesvisites1Service.getVisiteById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested visite is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

@Injectable({
    providedIn: 'root'
})
export class VisitesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _lesvisites1Service: LesVistes1Service)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: VisitePagination;visites: Visite[] }>
    {
        return this._lesvisites1Service.getVisites();
    }
}
