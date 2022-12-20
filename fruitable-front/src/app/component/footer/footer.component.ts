import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categories!:string[];

  constructor(
    private cateService: CategoryService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.cateService.getAllCategories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (err)=>{
        console.log(err);
        this.snack.open("Error in fetching categories!!")
      }
    )
  }

}
