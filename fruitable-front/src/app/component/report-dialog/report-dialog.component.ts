import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {

  reportData!:FormGroup;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.reportData = this.formBuilder.group({
      spamOrMislead: [false,Validators.required],
      badQualityProducts: [false,Validators.required],
      others: [false,Validators.required],
      description:['',[Validators.required,Validators.maxLength(255)]],
    });
    
  }

  get field(){
    return this.reportData.controls;
  }




}
