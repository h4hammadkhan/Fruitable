import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-category-tag',
  templateUrl: './category-tag.component.html',
  styleUrls: ['./category-tag.component.css']
})
export class CategoryTagComponent implements OnInit {

  category!:Category[];
  constructor(
    private cateService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.cateService.getCategories().subscribe(
      (data:any)=>{
        console.log(data);
        this.category = data;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
