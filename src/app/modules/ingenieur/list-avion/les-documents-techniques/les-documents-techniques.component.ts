import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-les-documents-techniques',
  templateUrl: './les-documents-techniques.component.html',
  styleUrls: ['./les-documents-techniques.component.scss']

})
export class LesDocumentsTechniquesComponent implements OnInit {
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }
  ajoutDocument(): void{

  }
}
