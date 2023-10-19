import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options ={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  //register api call 
  register(acno:any,username:any,password:any){
    const body={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:5000/register',body)
  }
  //login api call
  login(acno:any,password:any){
    const body ={
      acno,
      password
    }
    return this.http.post('http://localhost:5000/login',body)
  }

  //append token to the request header
  appendToken(){
    //to  get the token from the localstorage
    let token = localStorage.getItem('token')

    //create hhtp header
    let headers = new HttpHeaders()

    if(token){
      headers = headers.append('verify-token',token)
      options.headers=headers
    }
    return options
  }

  //getBAlance api call
  getBalance(acno:any){
    return this.http.get('http://localhost:5000/balance/'+acno,this.appendToken())
  }

 //Fund Transfer
  fundTransfer(toAcno:any,password:any,amount:any){
    const body ={
      toAcno,
      password,
      amount
    }

    return this.http.post('http://localhost:5000/fundtransfer',body,this.appendToken())

 }

 //fet transaction info
 getTransaction(){
 return this.http.get('http://localhost:5000/transaction',this.appendToken())
 }
 //delete user account
 deleteUser(){
  return this.http.delete('http://localhost:5000/deleteAccount', this.appendToken())
 }
 
  
}
 
