import { CategoryService } from '../../service/category.service';
import { ProductserviceService } from '../../service/productservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Products } from '../../model/products';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/service/login.service';
import { HttpEventType } from '@angular/common/http';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  categories!:Category[];
  productImage!:File | any;
  Product!:Products;
  imageSrc!: string | any;
  userId!:number;

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
      
      this.Product = this.productForm.value;
      // upload product with image
      this.productService.addNewProductWithImage(this.Product,this.productImage).subscribe(
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
