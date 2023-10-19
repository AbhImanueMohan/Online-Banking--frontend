import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //register success loading
  regSuccessLoading : string=""

  //register error message
  regErrorMsg : string =""
  //dependancy injection 
constructor(private registerFB:FormBuilder,private api:ApiService,private registerRoute:Router){}

//form Group Creation
registerForm = this.registerFB.group({
  
  //array creation
  username: ['',[Validators.required,Validators.pattern('[a-zA-Zs]*')]],
  acno:['',[Validators.required,Validators.pattern('[0-9A-Z]*')]],
  password:['',[Validators.required,Validators.pattern('[0-9a-z]*')]]
})
//control passes to register.html
register(){
 
  console.log(this.registerForm.value); //{username: 'abhi1233', acno: 'xzXzv', password: 'fzds'}
  if(this.registerForm.valid){
    let username = this.registerForm.value.username
    let acno= this.registerForm.value.acno
    let password= this.registerForm.value.password
    this.api.register(acno,username,password).subscribe((result:any)=>{
      alert(result.message)

      this.regSuccessLoading = result.message //successfully registered
      setTimeout(()=>{
        this.registerRoute.navigateByUrl('')
      },3000)
      
  
    }, ((result:any)=>{
      this.regErrorMsg=result.error.message;
      
    }))

    //reset the form 
    setTimeout(()=>{
      this.registerForm.reset()
      this.regErrorMsg=""

    },2000)
    // alert('Register Clicked')
   
  }
  else{
    alert("Invalid Form")
  }
 
}
}
