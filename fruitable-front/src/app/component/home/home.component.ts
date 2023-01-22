import { CategoryService } from './../../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from './../../service/productservice.service';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import { ProductPageableResponse } from 'src/app/model/ProductPageableResponse';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // product:Product[] = [];
  Products!:ProductPageableResponse;
  pageEvent!: PageEvent;
  cate!:number ;
  keyword!:string;

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

    this.activatedRoute.params.subscribe(params =>{
      if(params['keyword']){
        this.keyword = String(this.activatedRoute.snapshot.paramMap.get('keyword'));
        console.log("home:",this.keyword);
        
        this.getSearchedProducts();
      }
      else if(params['cate']){
        this.cate = Number(this.activatedRoute.snapshot.paramMap.get('cate'));
        this.getProductByCategory();
      }
      else{
        this.getAllProducts();
      }
    });

  }


  // get all products
  getAllProducts(){
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
  }

  getSearchedProducts(){
    this.productService.searchedProducts(this.keyword).subscribe(
      (data:any)=>{
        this.Products = data;
      },
      (error)=>{
        console.log(error);
        Swal.fire("error","Error in fetching data!!","error");
      }
    )
  }

  onPaginateChange(event: PageEvent){
    let pageNumber = event.pageIndex; 
    let pageSize = event.pageSize;
    this.activatedRoute.paramMap.subscribe(
      ()=>{
        this.activatedRoute.params.subscribe(params =>{
          if(params['keyword']){
            this.keyword = String(this.activatedRoute.snapshot.paramMap.get('keyword'));
            this.productService.searchedProducts(this.keyword,pageNumber,pageSize).subscribe(
              (data:any)=>{
                this.Products = data;
              },
              (error)=>{
                console.log(error);
                Swal.fire("error","Error in fetching data!!","error");
              }
            )
          }
          else if(params['cate']){
            this.cate = Number(this.activatedRoute.snapshot.paramMap.get('cate'));
            this.productService.getProductByCategoryId(this.cate,pageNumber,pageSize).subscribe(
              (data:any)=>{
                this.Products = data;
              },
              (err)=>{
                console.log(err);
                Swal.fire("error","Error in fetching data!!","error");
              }
            )
          }
          else{
            this.productService.getProducts(pageNumber,pageSize).subscribe(
              (data:any)=>{
                this.Products = data;
                console.log(data);
              },
              (err)=>{
                console.log(err);
                Swal.fire("error","Error in fetching data!!","error");
        
              }
            );
          }
        });
      }
    )
    
 
  }

  getProductByCategory(){
    this.productService.getProductByCategoryId(this.cate).subscribe(
      (data:any)=>{
        this.Products = data;
      },
      (err)=>{
        console.log(err);
        Swal.fire("error","Error in fetching data!!","error");
      }
    )
  }

}
