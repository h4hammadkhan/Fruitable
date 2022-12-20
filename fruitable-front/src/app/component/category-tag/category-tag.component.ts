import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-tag',
  templateUrl: './category-tag.component.html',
  styleUrls: ['./category-tag.component.css']
})
export class CategoryTagComponent implements OnInit {

  category:string[]=[];
  constructor(
    private cateService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.cateService.getAllCategories().subscribe(
      (data:any)=>{
        this.category = data;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
