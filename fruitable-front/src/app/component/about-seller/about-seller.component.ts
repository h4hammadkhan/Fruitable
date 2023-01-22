import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImpressionResponse } from 'src/app/model/impressionResponse';
import { ProductPageableResponse } from 'src/app/model/ProductPageableResponse';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/service/login.service';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { ReportService } from 'src/app/service/report.service';
import { SignupService } from 'src/app/service/signup.service';
import { VoteService } from 'src/app/service/vote.service';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
  selector: 'app-about-seller',
  templateUrl: './about-seller.component.html',
  styleUrls: ['./about-seller.component.css']
})
export class AboutSellerComponent implements OnInit {

  userDetail!:User;
  reportData!:FormGroup;
  impressionData!:FormGroup;
  Products!:ProductPageableResponse;
  pageEvent!: PageEvent;
  userId!:number;
  userName!: string; // current logged in userName
  sellerId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private signupService: SignupService,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private matSnack: MatSnackBar,
    private voteService: VoteService,
    private productService: ProductserviceService,

  ) { }

  ngOnInit() {

    // get user id form url
    this.userId = this.activatedRoute.snapshot.params['sellerId'];
    
    this.loadAboutSellerInfo();
    
    this.reportData = this.formBuilder.group({
      spamOrMislead:['',Validators.required],
      badQualityProducts:['',Validators.required],
      others:['',Validators.required],
      description:['',Validators.required],
      buyerUserName:['',Validators.required],
      user:this.formBuilder.group({
        userId: ['',Validators.required],
      }),
    })
    
     // get Current Logged in user
    this.userName = this.loginService.getUserName();

    // get current logged n user userId
    this.sellerId = this.loginService.getUserId();

  }

  

  loadAboutSellerInfo(){
    this.signupService.getUserById(this.userId).subscribe(
      (data:any)=>{
        this.userDetail = data;
        console.log(data);
        // this.authority = data.authorities[0].authority;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  fireDialog(){
    if(this.loginService.getToken()==null){
      this.router.navigate(['/login']);
    }else{
      this.openDialog();
    }
  }

  openDialog(){
    let dialogRef = this.dialog.open(ReportDialogComponent,{
      width: '400px',
      data:{name: `${this.userDetail.first_name} ${this.userDetail.last_name}`}
    });

    dialogRef.afterClosed().subscribe((result:any)=>{
      console.log("result:",result);
      
      if(!result){
                
      }else{
        this.reportData.patchValue({
          spamOrMislead: result.spamOrMislead,
          badQualityProducts: result.badQualityProducts,
          others: result.others,
          description: result.description,
          buyerUserName: this.userName,
          user:{
            userId: this.userDetail.userId,
          },
        })
        console.log("reportdata:",this.reportData.value);
        this.reportService.addReport(this.reportData.value).subscribe(
          (data:any)=>{
            console.log(data);
            this.matSnack.open("successfully added",'',{
              duration: 3000,
              verticalPosition: "top",
              horizontalPosition: "right",
              panelClass: "snack-success"
            })
          },
          (error)=>{
            console.log(error);
            this.matSnack.open("Something went wong!!",'',{
              duration: 3000,
              verticalPosition: "top",
              horizontalPosition: "right",
              panelClass: "snack-dander"
            })
          }
        )
      }
      
      
    })
  }

  downVote(){
    if(this.loginService.getToken()==null){
      this.router.navigate(['/login']);
    }else{
      this.impressionData = this.formBuilder.group({
        vote:"down",
        sellerUserName:this.userDetail.userName,
        user: this.formBuilder.group({
          userId: this.sellerId,
        })
      })
      console.log(this.impressionData.value);
      
      this.voteService.voteDown(this.impressionData.value).subscribe(
        (data:ImpressionResponse)=>{
          console.log(data);
          this.matSnack.open(`${data.message}`,'',{
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snack-success"
          })
          this.loadAboutSellerInfo();
        },
        (error:any)=>{
          console.log(error);
          this.matSnack.open(`${error.error.message}`,'',{
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snack-dander"
          })
        }
      )
    }
  }

  upVote(){
    if(this.loginService.getToken()==null){
      this.router.navigate(['/login']);
    }else{
      this.impressionData = this.formBuilder.group({
        vote:"up",
        sellerUserName:this.userDetail.userName,
        user: this.formBuilder.group({
          userId: this.sellerId,
        })
      })
      console.log(this.impressionData.value);
      
      this.voteService.voteUp(this.impressionData.value).subscribe(
        (data:ImpressionResponse)=>{
          console.log(data);
          this.matSnack.open(`${data.message}`,'',{
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snack-success"
          })
          this.loadAboutSellerInfo();
        },
        (error:any)=>{
          console.log(error);
          this.matSnack.open(`${error.error.message}`,'',{
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snack-dander"
          })
        }
      )
    }
  }

  // get specific seller's  all product 
  loadSellerProduct(sellerId:number){
      this.sellerId = sellerId;
      this.productService.getProductsByUser(this.sellerId).subscribe(
        (data:any)=>{
          this.Products = data;
          console.log(data);
        },
        (err)=>{
          console.log(err);
          this.matSnack.open("Error in fetching data!!",'',{
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snack-dander"
          })
        }
      )
  }

  // get specific seller's  all product with pages
  onPaginateChange(event: PageEvent){
    let pageNumber = event.pageIndex; 
    let pageSize = event.pageSize;
    this.productService.getProductsByUser(this.sellerId,pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.Products = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  

}
