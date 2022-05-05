import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import {VisiteStatus, VisitePagination, VisiteTypeVisite, Visite } from 'app/modules/ingenieur/list-avion/les-visites1/les-visites1/les-visites1.types';

@Injectable({
    providedIn: 'root'
})
export class LesVistes1Service
{
    // Private
    private _status: BehaviorSubject<VisiteStatus[] | null> = new BehaviorSubject(null);
    private _type: BehaviorSubject<VisiteTypeVisite[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<VisitePagination | null> = new BehaviorSubject(null);
    private _visite: BehaviorSubject<Visite | null> = new BehaviorSubject(null);
    private _visites: BehaviorSubject<Visite[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

   /**
    ** Getter for status
    **/
    get status$(): Observable<VisiteStatus[]>
    {
        return this._status.asObservable();
    }

    /**
     * Getter for categories
     */
    get type$(): Observable<VisiteTypeVisite[]>
    {
        return this._type.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<VisitePagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for visits
     */
    get visite$(): Observable<Visite>
    {
        return this._visite.asObservable();
    }

    /**
     * Getter for vsistes
     */
    get visites$(): Observable<Visite[]>
    {
        return this._visites.asObservable();
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get status
     */
      getStatus(): Observable<VisiteStatus[]>
      {
          return this._httpClient.get<VisiteStatus[]>('api/apps/ecommerce/inventory/brands').pipe(
              tap((status) => {
                  this._status.next(status);
              })
          );
      }

      /**
       * Get categories
       */
      getType(): Observable<VisiteTypeVisite[]>
      {
          return this._httpClient.get<VisiteTypeVisite[]>('api/apps/ecommerce/inventory/categories').pipe(
              tap((type) => {
                  this._type.next(type);
              })
          );
      }

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
     getVisites(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
     Observable<{ pagination: VisitePagination; visites: Visite[] }>
 {
     return this._httpClient.get<{ pagination: VisitePagination; visites: Visite[] }>('api/apps/ecommerce/inventory/products', {
         params: {
             page: '' + page,
             size: '' + size,
             sort,
             order,
             search
         }
     }).pipe(
         tap((response) => {
             this._pagination.next(response.pagination);
             this._visites.next(response.visites);
         })
     );
 }

    /**
     * Get product by id
     */
     getVisiteById(id: string): Observable<Visite>
     {
         return this._visites.pipe(
             take(1),
             map((visites) => {

                 // Find the product
                 const visite = visites.find(item => item.id === id) || null;

                 // Update the product
                 this._visite.next(visite);

                 // Return the product
                 return visite;
             }),
             switchMap((visite) => {

                 if ( !visite )
                 {
                     return throwError('Could not found product with id of ' + id + '!');
                 }

                 return of(visite);
             })
         );
     }

     /**
      * Create product
      */
     createVisite(): Observable<Visite>
     {
         return this.visites$.pipe(

             switchMap(visites => this._httpClient.post<Visite>('api/apps/ecommerce/inventory/visite', {}).pipe(
                 map((newVisite) => {
                    console.log(newVisite);
                     // Update the products with the new product
                     this._visites.next([newVisite, ...visites]);
console.log( this._visites.next([newVisite,...visites]));
                     // Return the new product
                     return newVisite;
                 })
             ))
         );
     }


    /**
     * Update product
     *
     * @param id
     * @param visite
     */
     updateVisite(id: string, visite: Visite): Observable<Visite>
     {
         return this.visites$.pipe(
             take(1),
             switchMap(visites => this._httpClient.patch<Visite>('api/apps/ecommerce/inventory/product', {
                 id,
                 visite
             }).pipe(
                 map((updatedVisite) => {

                     // Find the index of the updated product
                     const index = visites.findIndex(item => item.id === id);

                     // Update the product
                     visites[index] = updatedVisite;

                     // Update the products
                     this._visites.next(visites);

                     // Return the updated product
                     return updatedVisite;
                 }),
                 switchMap(updatedVisite => this.visite$.pipe(
                     take(1),
                     filter(item => item && item.id === id),
                     tap(() => {

                         // Update the product if it's selected
                         this._visite.next(updatedVisite);

                         // Return the updated product
                         return updatedVisite;
                     })
                 ))
             ))
         );
     }

     /**
      * Delete the product
      *
      * @param id
      */
     deleteVisite(id: string): Observable<boolean>
     {
         return this.visites$.pipe(
             take(1),
             switchMap(visites => this._httpClient.delete('api/apps/ecommerce/inventory/product', {params: {id}}).pipe(
                 map((isDeleted: boolean) => {
                     // Find the index of the deleted product
                     const index = visites.findIndex(item => item.id === id);
                     // Delete the product
                     visites.splice(index, 1);
                     // Update the products
                     this._visites.next(visites);

                     // Return the deleted status
                     return isDeleted;
                 })
             ))
         );
     }


    /**
     * Update the avatar of the given contact
     *
     * @param id
     * @param avatar
     */
    /*uploadAvatar(id: string, avatar: File): Observable<Contact>
    {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<Contact>('api/apps/contacts/avatar', {
                id,
                avatar
            }, {
                headers: {
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedContact) => {

                    // Find the index of the updated contact
                    const index = contacts.findIndex(item => item.id === id);

                    // Update the contact
                    contacts[index] = updatedContact;

                    // Update the contacts
                    this._contacts.next(contacts);

                    // Return the updated contact
                    return updatedContact;
                }),
                switchMap(updatedContact => this.contact$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the contact if it's selected
                        this._contact.next(updatedContact);

                        // Return the updated contact
                        return updatedContact;
                    })
                ))
            ))
        );
    }*/
}
