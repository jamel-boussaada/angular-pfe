/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { DialogComponent } from './../../dialog/dialog.component';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import {
    debounceTime,
    map,
    merge,
    Observable,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/modules/user';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'liste',
    templateUrl: './listedescomptes.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
            table {
                width: 100%;
            }

            .mat-form-field {
                font-size: 14px;
                width: 100%;
            }

            td,
            th {
                width: 25%;
            }

            .container {
                max-width: 1000px;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class ListeComponent implements OnInit {
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();

    displayedColumns: string[] = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'roles',
        'update',
        'delete',
    ];
    dataSource: MatTableDataSource<any>;
    /* dataSource; */

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    /**
     * Constructor
     */
    constructor(private userService: UserService, private dialog: MatDialog) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this.getallUsers();
    }

    getallUsers() {
        this.userService.getAllUsers().subscribe({
            next: (data) => {

                this.dataSource = new MatTableDataSource(data);

                this.dataSource.sort = this.sort;
            },
            error: () => {
                alert('error');
            },
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.error(filterValue.trim().toLowerCase());
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDialog(): any {
        this.dialog
            .open(DialogComponent, {
                width: '30%',
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'save') {
                    this.getallUsers();
                }
            });
    }

    updateUser(row: any) {
        this.dialog
            .open(DialogComponent, {
                width: '30%',
                data: row,
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'Update') {
                    this.getallUsers();
                }
            });
    }
    deleteUser(id: number) {
        this.userService.deleteUser(id).subscribe({
            next: () => {
                alert('error');
                this.getallUsers();
            },
            error: () => {
                confirm('voulez vous supprimez ce utilisateur');
                this.getallUsers();
            },
        });
    }
}
