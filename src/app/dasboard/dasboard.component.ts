import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent  implements OnInit {
  transferSuccess:string=''
  transferError:string=''
  balance:any;

  deleteConfirmStatus: boolean = false;

  deleteSuccessStatus:string=''

//for account deletion
  acno:any;

  //hold logout status
  logoutStatus: boolean=false

  //to hold current account number
  currentAcno:any;

  // to hold current username
user: string ="";

  //readmore read less
isCollapse: boolean = true;
constructor(private fundFB:FormBuilder,private api :ApiService, private dashboardRouter:Router) {}

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert("Please Login")
      //redirected to the login page
      this.dashboardRouter.navigateByUrl('')
    }
   if(localStorage.getItem('currentUser')){
    this.user =localStorage.getItem('currentUser') || "";
   }

    if(localStorage.getItem('currentAcno')){
     this.currentAcno =localStorage.getItem('currentAcno') || "";
    }
  }

collapse(){
  this.isCollapse=!this.isCollapse
}
transfer(){
      
}

fundForm = this.fundFB.group({
  creditacno: ['', [Validators.required, Validators.pattern('[A-Z0-9]*')]],
  password: ['', [Validators.required, Validators.pattern('[a-z0-9]*')]],
  amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
})
getBalance(){
this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
  console.log(result);
this.balance = result.balance 
},
(result:any)=>{
  alert(result.error.message)
}
)
}

//fund transfer
fundTransfer(){
  if(this.fundForm.valid){
    //get details from fund transferForm
    let creditAcno = this.fundForm.value.creditacno
    let password = this.fundForm.value.password
    let amount = this.fundForm.value.amount
    this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
      // console.log(result);
      this.transferSuccess=result.message
      setTimeout(()=>{
        this.fundForm.reset()
        this.transferSuccess=""
      },1000)
    },(result:any)=>{
console.log(result.error.message);
this.transferError=result.error.message
setTimeout(()=>{
  this.fundForm.reset()
  this.transferError=""
},2000)

    })

  }
  else{
    alert("Invaid Form")
  }
}
fundReset(){
  this.fundForm.reset()
}
logout(){
  //clear the localstorage
  localStorage.clear()
  //logout status
  this.logoutStatus=true
  setTimeout(()=>{
    this.dashboardRouter.navigateByUrl('')
  },3000)

}
deleteAccount(){
  this.acno=localStorage.getItem('currentAcno');
  this.deleteConfirmStatus=true;

}
cancelDeleteAccount(){
  //back to normal
  this.acno=""
  this.deleteConfirmStatus=false
}
deleteFromParent(){
  this.api.deleteUser().subscribe((result:any)=>{
    localStorage.clear()
    this.deleteSuccessStatus=result.message//your account has been deleted

    setTimeout(() => {
         //navigate to  login page
    this.dashboardRouter.navigateByUrl('')
 
    },3000);
  })
}

}
