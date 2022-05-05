import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-traveaux-supplementaires',
  templateUrl: './traveaux-supplementaires.component.html',
  styleUrls: ['./traveaux-supplementaires.component.scss']

})
export class TraveauxSupplementairesComponent implements OnInit {
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }
  ajoutTraveau(): void{

  }
}
