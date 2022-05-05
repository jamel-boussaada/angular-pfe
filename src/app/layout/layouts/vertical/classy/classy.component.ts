import { AvionService } from 'app/shared/services/avion.service';
import {
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    Output,
    EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    @Output() event = new EventEmitter<string>();
    jwtHelper;
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    res;
    avions;
    userDetails;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public avionService: AvionService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;



                //                 let i =0;
                // if ( this.navigation.default[0].subtitle ==='ingenieur' ){
                //     for( i=0;i<10;i++){
                //     // this.navigation.default[0].children[4].title='i';
                //     this.navigation.default[0].children.unshift({id:String(i), title:'ok',
                //     type:'basic',
                //     icon:'heroicons_outline:clipboard-check',
                //     link:'/ingenieur/programme/'+String(i),
                // });
                // }
                //      }

                if (this.navigation.default[0].subtitle === 'ingenieur') {

                    this.avionService.getAllAvion().subscribe((avions) => {
                  avions.forEach((res)=>{
                    this.navigation.default[0].children.unshift({
                        id: String(res.id),
                        title: res.immatriculation,
                        type: 'basic',
                        icon: 'mat_solid:airplanemode_active',
                        link:
                            '/ingenieur/listAvion/' + String(res.id),
                        // navigate: this._router.navigate(['/ingenieur/listAvion/',res.id]),
                    });
                  });
                });
                }
            });

        // Subscribe to the user service
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                //  console.log(this.user);
                this.jwtHelper = new JwtHelperService();
                this.userDetails = this.jwtHelper.decodeToken(
                    localStorage.getItem('authentificationToken')
                );
                // console.log(this.userDetails);
                this.user.email = this.userDetails.username;
                this.user.id = this.userDetails.id;
                this.user.name = this.userDetails.nom;
                this.user.avatar= '../../../../../assets/images/user.jpg';
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string, nav: any): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );
        // console.log(navigation);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

getAllAvion(): any{

    this.avionService.getAllAvion().subscribe((avions) => {
        this.avions =avions;
                             });
                             return this.avions;
}


}
