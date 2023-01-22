import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  categories:string[] = [];

  constructor(
    private cateService: CategoryService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    // this.cateService.getAllCategories().subscribe(
    //   (data:any)=>{
    //     this.categories = data;
    //   },
    //   (err)=>{
    //     console.log(err);
    //     this.snack.open("Error in fetching categories!!")
    //   }
    // )
  }

}
