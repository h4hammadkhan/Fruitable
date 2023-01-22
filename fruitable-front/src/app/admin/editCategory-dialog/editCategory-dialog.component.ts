import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-editCategory-dialog',
  templateUrl: './editCategory-dialog.component.html',
  styleUrls: ['./editCategory-dialog.component.css']
})
export class EditCategorytDialogComponent implements OnInit {

  categoriesForm!:FormGroup;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private cateService: CategoryService,
    private matSnack: MatSnackBar,
  ) { }

  ngOnInit() {

    this.categoriesForm = this.formBuilder.group({
      categoryId: ['',Validators.required],
      categoryName: ['',Validators.required],
    });

    this.loadCategoryById();

  }

  get field(){
    return this.categoriesForm.controls;
  }

  loadCategoryById(){
    this.cateService.getCategoryById(this.data.categoryId).subscribe(
      (data:any)=>{
        console.log(data);
        this.categoriesForm.patchValue({
          categoryId: data.categoryId,
          categoryName: data.categoryName,
        })
      },
      (error)=>{
        console.log(error);
        this.matSnack.open("Something Went Wrong",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-dander"
        });
        
      }
    )
  }

  



}
