import { CategoryService } from '../../service/category.service';
import { ProductserviceService } from '../../service/productservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Products } from '../../model/products';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/service/login.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm!: FormGroup;
  categories!:Category[];
  productImage!:File | any;
  Product!:Products;
  imageSrc!: string | any;
  productSrc!: string;
  userId!:number;
  productId!: number;


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductserviceService,
    private cateService: CategoryService,
    private loginServce: LoginService,
    private activatedRoute: ActivatedRoute
  ) { }

  @ViewChild('fileInput') fileInput!: ElementRef;
  

  ngOnInit(): void {

    // get product id from URL
    this.productId=this.activatedRoute.snapshot.params['id'];

    // load all category
    this.getCategories();

    // load form serve and set into the form
    this.getProductById();

    this.userId = this.loginServce.getUserId();

    this.updateProductForm = this.formBuilder.group({
      productId:['',Validators.required],
      productName:['',Validators.required],
      quantity:['',Validators.required],
      price:['',Validators.required],
      measure:['',Validators.required],
      productCategory: this.formBuilder.group({
        categoryId:['',Validators.required],
      }),
      user:this.formBuilder.group({
        userId:['',Validators.required],
      })
    })


  }

  // file input reset value
  fileInputReset(){
    this.fileInput.nativeElement.value = "";
  }

  // get image form user
  selectImg(event:any){
    console.log(event.target.files[0]);
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      this.productImage = file;

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
    
  }

  // get form fields
  get getFields(){
    return this.updateProductForm.controls;
  }

  // update product
  addProduct(){
    if(this.updateProductForm.valid){
      
      this.Product = this.updateProductForm.value;
      if(this.productImage == undefined){
        this.productImage = null
      }
      console.log("ProductIamge: ",this.productImage);
      
      // upload product with image
      this.productService.updateProduct(this.Product,this.productImage).subscribe(
        (data)=>{
          console.log(data);
          Swal.fire("Success","successfully add new product!!","success");
          // reset all fields
          this.updateProductForm.reset();
          this.productImage = null;
          this.imageSrc = null;
          this.fileInputReset();
        },
        (err)=>{
          console.log(err);
          Swal.fire("Error","Error in adding new product!!","error");
        }
      )
    }

  }

  // getting all categories
  getCategories(){
    this.cateService.getCategories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  // get product by id
  getProductById(){
    this.productService.getSingleProduct(this.productId).subscribe(
      (data:any)=>{    
        // set data into the form
        console.log(data);
        
        this.updateProductForm.patchValue({
          productId: data.productId,
          productName: data.productName,
          quantity: data.quantity,
          price: data.price,
          measure: data.measure,
          productCategory: data.productCategory,
          user: data.user
        })

        this.productSrc = 'http://localhost:8080/product/productImage/'+data.product_image;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }




}
