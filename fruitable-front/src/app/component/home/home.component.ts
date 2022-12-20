import { CategoryService } from './../../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../model/product';
import { ProductserviceService } from './../../service/productservice.service';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product:Product[] = [];
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

  // @HostListener("window:scroll", [])
  // onScroll(): void {
  //   const hasCate = this.activatedRoute.snapshot.paramMap.has('cate');
  //   if(!hasCate){
  //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //       // Load Your Data Here
  //       this.limit +=5;

  //       this.productService.getLimitProducts(this.limit).subscribe(
  //         (data)=>{
  //           this.product = data;
  //         },
  //         (err)=>{
  //           console.log(err);
  //         }
  //       )
  //     }
  //   }
  // }


  getProducts(){

    const hasCate = this.activatedRoute.snapshot.paramMap.has('cate');
    if(hasCate){
      this.cate = String(this.activatedRoute.snapshot.paramMap.get('cate'));
      this.getProductByCategory();
    }
    else{
      this.productService.getLimitProducts(this.limit).subscribe(
        (data:Product[])=>{
          this.product = data;
          console.log(data);
          
        },
        (err)=>{
          console.log(err);
          Swal.fire("error","Error in fetching data!!","error");

        }
      )
    }

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

  onScrollDown(ev:any){
    // console.log("scrolled down!!",ev);
    const hasCate = this.activatedRoute.snapshot.paramMap.has('cate');
    if(!hasCate){

      this.limit +=4;

      this.productService.getLimitProducts(this.limit).subscribe(
        (data)=>{
          this.product = data;
        },
        (err)=>{
          console.log(err);
        }
      )
    }

  }

}
function viewChild(arg0: string) {
  throw new Error('Function not implemented.');
}

