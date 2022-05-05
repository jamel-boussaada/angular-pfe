import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
    selectedFood='choisir un role';
    disableSelect = new FormControl(false);
    avionForm!: FormGroup;
  constructor(    private formBuilder: FormBuilder,
    private _router: Router,) { }
  ngOnInit(): void {
    this.avionForm = this.formBuilder.group({
        role: [''],


    });

  }
role(): void{
    // alert(this.avionForm.value.role);
    if(this.avionForm.value.role==='ing'){
        this._router.navigateByUrl('/ingenieur/addAvion');
    }else{
        this._router.navigateByUrl('/technecien/visite');
    }
}
}
