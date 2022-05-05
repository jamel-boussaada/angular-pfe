import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    item: any;
    ob: any;
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        console.log(this._navigation.asObservable());

        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(id: string): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }

    // /**
    //  * Get  navigation data defalt
    //  */
    getdefaultAdmin(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this.item = navigation.default;
                // console.log(this.item);
                navigation.default = [];
                navigation.default.push(this.item[0]);
                // console.log(navigation);
                this._navigation.next(navigation);
            })
        );
    }

    getdefaulIngenieur(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this.item = navigation.default;
                // console.log(this.item);
                navigation.default = [];
                navigation.default.push(this.item[3]);
                navigation.default.push(this.item[1]);

                // console.log(navigation);
                this._navigation.next(navigation);
            })
        );
    }
    getdefaulTechnecien(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this.item = navigation.default;
                // console.log(this.item);
                navigation.default = [];
                navigation.default.push(this.item[2]);
                // console.log(navigation);
                this._navigation.next(navigation);
            })
        );
    }

    // /**
    //  * Get  navigation data defalt
    //  */
    // getfuturistic(): Observable<Navigation> {
    //     return this._httpClient.get<Navigation>('api/common/navigation').pipe(
    //         tap((navigation) => {
    //             this._navigation.next(navigation);
    //         })
    //     );
    // }
}
