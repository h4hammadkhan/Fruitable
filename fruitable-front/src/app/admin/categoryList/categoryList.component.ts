import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';
import { EditCategorytDialogComponent } from '../editCategory-dialog/editCategory-dialog.component';

@Component({
  selector: 'app-categoryList',
  templateUrl: './categoryList.component.html',
  styleUrls: ['./categoryList.component.css']
})
export class CategoryListComponent implements OnInit {

 categories!: Category[];

  constructor(
    private cateService: CategoryService,
    private matSnack: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
   this.cateService.getCategories().subscribe(
    (data:any)=>{
      console.log(data);
      this.categories = data;
    },
    (error)=>{
      console.log(error);
      this.matSnack.open("Something Went Wrong",'',{
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "right",
        panelClass: "snack-dander"
      })
    }
   )
  }
  

  openDialog(categoryId:number){
    let dialogRef = this.dialog.open(EditCategorytDialogComponent,{
      width: '600px',
      data:{categoryId: categoryId}
    });

    dialogRef.afterClosed().subscribe((result:any)=>{
      console.log("result:",result);
      
      if(!result){
                
      }else{
        console.log("result:",result);
        this.cateService.updateCategory(result).subscribe(
          (data:any)=>{
            console.log(data);
            this.matSnack.open("successfully updated",'',{
              duration: 3000,
              verticalPosition: "top",
              horizontalPosition: "right",
              panelClass: "snack-success"
            })
          },
          (error)=>{
            console.log(error);
            this.matSnack.open("Something went wong!!",'',{
              duration: 3000,
              verticalPosition: "top",
              horizontalPosition: "right",
              panelClass: "snack-dander"
            })
          }
        )
      }
            
    })
  }


  

  deleteCategory(categoryId:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'cancel',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#7fb602',
      confirmButtonAriaLabel: "hk",
    }).then(
      (yes)=>{
        if(yes.isConfirmed){
          this.cateService.deleteCategory(categoryId).subscribe(
            (data)=>{
              this.matSnack.open("Delete successfully",'',{
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "right",
                panelClass: "snack-success"
              });
              this.getAllCategories();
            },
            (error)=>{
              console.log(error);
              this.matSnack.open("Something went wong!!",'',{
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "right",
                panelClass: "snack-dander"
              });
            }
          )
        }
      }
    )
  }


}
