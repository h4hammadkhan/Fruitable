import { CategoryService } from './../../service/category.service';
import { ProductserviceService } from './../../service/productservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from './../../model/product';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  categories!:string[];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductserviceService,
    private cateService: CategoryService,
  ) { }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      title:['',Validators.required],
      price:['',Validators.required],
      description:['',Validators.required],
      image:['',Validators.required],
      category:['',Validators.required],
    })

    this.getCategories();

  }

  get getFields(){
    return this.productForm.controls;
  }

  addProduct(){
    if(this.productForm.valid){

      this.productService.addProduct(this.productForm.value).subscribe(
        (data)=>{

          Swal.fire("Success","successfully add new product!!","success");
        },
        (err)=>{
          console.log(err);
          Swal.fire("Error","Error in adding new product!!","error");
        }
      )

    }

  }

  getCategories(){
    this.cateService.getAllCategories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (err)=>{
        console.log(err);
      }
    )
  }






}
