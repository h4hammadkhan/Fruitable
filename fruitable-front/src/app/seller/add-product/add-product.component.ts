import { CategoryService } from '../../service/category.service';
import { ProductserviceService } from '../../service/productservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Products } from '../../model/products';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/service/login.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  categories!:any;
  productImage!:File | any;
  Product!:Products;
  imageSrc!: string | any;
  userId!:number;
  progress!: number;
  ProductImageUploadMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductserviceService,
    private cateService: CategoryService,
    private loginServce: LoginService,
  ) { }

  @ViewChild('fileInput') fileInput!: ElementRef;
  

  ngOnInit(): void {

    this.userId = this.loginServce.getUserId();

    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
      quantity:['',Validators.required],
      product_image:[''],
      price:['',Validators.required],
      measure:['',Validators.required],
      productCategory: this.formBuilder.group({
        categoryId:['',Validators.required],
      }),
      user:this.formBuilder.group({
        userId:this.userId
      })
    })

    this.getCategories();

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
    return this.productForm.controls;
  }

  // add new product
  addProduct(){
    if(this.productForm.valid){
      // for multiPartFile data
      let formData = new FormData();
      formData.append("image",this.productImage);
      
      // upload product image
      this.productService.uploadProductImage(formData).subscribe(
        (event: any) =>{
          switch(event.type){
            case HttpEventType.UploadProgress:
              var eventTotal = event.total ? event.total : 0;
              this.progress = Math.round(event.loaded / eventTotal * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('Image Upload Successfully!', event.body);
              // set response message  
              this.ProductImageUploadMsg = event.body.message;
              // set response image name into form controller
              this.productForm.controls['product_image'].setValue(event.body.fileName);
              // set all data
              this.Product = this.productForm.value;
              // add product
              this.productService.addNewProduct(this.Product).subscribe(
                (data)=>{
                  console.log(data);
                  Swal.fire("Success","successfully add new product!!","success");
                  // reset all fields
                  this.productForm.reset();
                  this.productImage = null;
                  this.imageSrc = null;
                  this.fileInputReset();
                },
                (err)=>{
                  console.log(err);
                  Swal.fire("Error","Error in adding new product!!","error");
                }
              )
            setTimeout(() => {
              this.progress = 0;
            }, 3000);
          }
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






}
