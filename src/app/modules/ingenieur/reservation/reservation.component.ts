import { ReservasionDialogComponent } from './reservasion-dialog/reservasion-dialog.component';
import { VolService } from './../../../shared/services/vol.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  isLoading: boolean = false;
  searchInputControl: FormControl = new FormControl();
vol;
row;
dataSource: MatTableDataSource<any>;
/* dataSource; */

// eslint-disable-next-line @typescript-eslint/member-ordering
@ViewChild(MatPaginator) paginator!: MatPaginator;
// eslint-disable-next-line @typescript-eslint/member-ordering
@ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'avion',
    'DateReservation',
    'Pilote',
    'Instructeur',
    'Activiteé',
    'Durée',
    'Départ',
    'Arrivée',
    'att',
    'compteurArrivée',
    'compteurDepart',
  ];

  constructor(private volService: VolService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
this.getAllReservasion();
  }

  getAllReservasion(): void{
    this.volService.getAllReservasion().subscribe((data) =>{
        this.row=data;
        this.dataSource = new MatTableDataSource(data);
        console.log(data);
        this.dataSource.sort = this.sort;
              });
  }

  openDialog(): void{


    this.dialog.open(ReservasionDialogComponent,
        {
// data:operation.operations,

width: '1300px',
height:'500px'
        },
    );
  }
  updateUser(row): void{}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.error(filterValue.trim().toLowerCase());
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}
}
