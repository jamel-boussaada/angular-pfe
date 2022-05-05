import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthInterceptor } from 'app/shared/interceptor/auth.interceptor';
import { UserService } from 'app/shared/services/user.service';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})

export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;



    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    jwtHelper;
    signInForm: FormGroup;
    showAlert: boolean = false;
    userDetails;
    private _isLoggedIn= new BehaviorSubject<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoggedIn=this._isLoggedIn.asObservable();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,

        private _formBuilder: FormBuilder,
        private _router: Router,
        private userService: UserService,

    ) {}



    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            username: [
                'jamelboussaada@gmail.com',
                [Validators.required, Validators.email],
            ],
            password: ['jamel1234', Validators.required],
        });
        // console.log(this.signInForm.value);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            console.log(this.signInForm.value);
            console.log(this.signInForm.invalid);
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this.userService.login(this.signInForm.value).subscribe(
            (data) => {
                console.log(data);
                AuthInterceptor.accessToken=data.token;
localStorage.setItem('authentificationToken',data.token);
this._isLoggedIn.next(true);
                this.jwtHelper = new JwtHelperService();
           this.userDetails =  this.jwtHelper.decodeToken(data.token);

if(this.userDetails.roles[0] === 'ROLE_ADMIN'){
    this._router.navigateByUrl('/admin/compte');
}else if (this.userDetails.roles[0] === 'ROLE_TECHNECIEN'){
    this._router.navigateByUrl('/technecien/visite');
}else{
    this._router.navigateByUrl('/role');
}

               ;
            },
            (response) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: ' email ou mot de passe non valide',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }
}
