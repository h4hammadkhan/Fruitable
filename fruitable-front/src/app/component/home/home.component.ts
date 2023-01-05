import { CategoryService } from './../../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../model/product';
import { ProductserviceService } from './../../service/productservice.service';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import { Products } from 'src/app/model/products';
import { ProductPageableResponse } from 'src/app/model/ProductPageableResponse';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product:Product[] = [];
  Products!:ProductPageableResponse;
  pageEvent!: PageEvent;
  cate:string = '';
  limit = 4;

  constructor(
    private productService: ProductserviceService,
    private activatedRoute: ActivatedRoute,
    private cateService: CategoryService,
  ) { }
  

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      ()=>{
        this.getProducts();
      }
    )
       
  }

  @ViewChild('shop') public shop!: ElementRef;

  public moveToShop():void {
    this.shop.nativeElement.scrollIntoView({ behavior: 'smooth'});
}



  getProducts(){

    // const hasCate = this.activatedRoute.snapshot.paramMap.has('cate');
    // if(hasCate){
    //   this.cate = String(this.activatedRoute.snapshot.paramMap.get('cate'));
    //   this.getProductByCategory();
    // }
    // else{
      this.productService.getProducts().subscribe(
        (data:any)=>{
          this.Products = data;
          console.log(data);
        },
        (err)=>{
          console.log(err);
          Swal.fire("error","Error in fetching data!!","error");

        }
      )
    // }

  }

  onPaginateChange(event: PageEvent){
    let pageNumber = event.pageIndex; 
    let pageSize = event.pageSize;
    this.productService.getProducts(pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.Products = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  getProductByCategory(){
    this.cateService.getProductByCategory(this.cate).subscribe(
      (data:Product[])=>{
        this.product = data;
      },
      (err)=>{
        console.log(err);
        Swal.fire("error","Error in fetching data!!","error");
      }
    )
  }

}


