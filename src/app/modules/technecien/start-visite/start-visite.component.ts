import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-start-visite',
  templateUrl: './start-visite.component.html',
  styleUrls: ['./start-visite.component.scss']
})
export class StartVisiteComponent implements OnInit {

    title = 'htmltopdf';

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild('pdfTable') pdfTable: ElementRef;
    resultatVisiteFormGroup: FormGroup;

    example: any;
  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    ) {

    const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state as {example: any};
        this.example = state.example;
  }

  ngOnInit(): void {
    this.resultatVisiteFormGroup = this._formBuilder.group({
        discription: ['', Validators.required],
        effectuer:[''],
        remarque:[''],
        // discription:[],
    });
    // console.log(    this.example);
  }
  saveVisite(): void{
console.log(  this.resultatVisiteFormGroup.value);
  }





  public downloadAsPDF(): void {


    const data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf');
    });

console.log(this.resultatVisiteFormGroup.value);
  }

}
