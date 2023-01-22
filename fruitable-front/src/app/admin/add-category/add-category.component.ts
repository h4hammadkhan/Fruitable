import { CategoryService } from '../../service/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
 
  categoriesForm!:FormGroup;
 
  constructor(
    private formBuilder: FormBuilder,
    private cateService: CategoryService,
    private snack: MatSnackBar,
   
  ) { }

  
  ngOnInit(): void {

    this.categoriesForm = this.formBuilder.group({
      categoryName:['',Validators.required],
    })

  }

 

  // get form fields
  get getFields(){
    return this.categoriesForm.controls;
  }


  addCategory(){
    this.cateService.addCategory(this.categoriesForm.value).subscribe(
      (data:any)=>{
        console.log(data);
        this.snack.open("Successfully added!!",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-success"
        });
        this.categoriesForm.reset();
      },
      (error)=>{
        console.log(error);
        this.snack.open("Something Went Wrong!!",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-dander"
        })
      }
    )    
  }




}
