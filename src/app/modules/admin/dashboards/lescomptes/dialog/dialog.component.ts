/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/shared/services/user.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
    roles = ['ROLE_ADMIN', 'ROLE_TECHNECIEN', 'ROLE_INGENIEUR'];
    myRole: any;
    user;

    actionBtn: string = 'save';
    userForm!: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        @Inject(MAT_DIALOG_DATA) public editdata: any,
        private matDiallogRef: MatDialogRef<DialogComponent>
    ) {}

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', Validators.required],
            telephone: [, Validators.required],
            password: ['', Validators.required],
            roles: [[], Validators.required],
        });

        console.log(this.editdata);

        if (this.editdata) {
            this.actionBtn = 'Update';
            this.userForm.controls['nom'].setValue(this.editdata.nom);
            this.userForm.controls['prenom'].setValue(this.editdata.prenom);
            this.userForm.controls['email'].setValue(this.editdata.email);
            this.userForm.controls['telephone'].setValue(
                this.editdata.telephone
            );
            this.userForm.controls['password'].setValue(this.editdata.password);
            this.userForm.controls['roles'].setValue(this.editdata.roles);

            console.log(this.userForm.value);
        }
    }
    addUser(): any {
        if (!this.editdata) {
            if (this.userForm.valid) {
                this.myRole = this.userForm.value.roles.split(',');

                this.userForm.value.roles = this.myRole;
                this.userForm.value.telephone = Number(
                    this.userForm.value.telephone
                );
                this.user = JSON.parse(JSON.stringify(this.userForm.value));

                console.log(this.user);
                this.userService.addUser(this.userForm.value).subscribe({
                    next: (data) => {
                        alert('error wwhere adding user');
                    },
                    error: () => {
                        alert('user added successfully');
                        this.matDiallogRef.close('save');
                    },
                });
            }
        } else {
            this.updateUser();
        }
    }
    updateUser() {
        this.myRole = this.userForm.value.roles.split(',');
        this.userForm.value.roles = this.myRole;
        console.log(this.userForm.value);
        this.user = JSON.parse(JSON.stringify(this.userForm.value));
        this.userService
            .updateUser(this.editdata.id, this.userForm.value)
            .subscribe({
                next: (data) => {
                    alert('error while update user');
                },
                error: () => {
                    alert('user updated successfully');
                    this.matDiallogRef.close('Update');
                },
            });
    }

    reset() {
        this.matDiallogRef.close('save');
    }
}
