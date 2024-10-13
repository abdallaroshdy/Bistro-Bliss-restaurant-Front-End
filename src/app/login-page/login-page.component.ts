import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {seccessfullResponse} from '../user-registeration/user-registeration.component'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  imports: [FormsModule],
  standalone: true
})
export class LoginPageComponent {

  http= inject(HttpClient)
  errormessage:string|null = null

  password : string = ''
  username:string = ''

  constructor(private router: Router) {}


  onRegsitClick(){
    this.router.navigate(['/registeration']);
  }

  login(){
    this.errormessage = null

    if(this.username == '' || this.password == ''){
      this.errormessage = "You Should Enter all input fields"
      return ;
    }

    let data ={
      email : this.username,
      password : this.password
    }


    this.http.post<seccessfullResponse>("http://localhost:3220/user/login" , data ,{ withCredentials: true }).subscribe((data)=>{
    console.log(data.data);
    if(data.data === "Login Successfully as admin"){
      this.router.navigate(['/adminPage']);
    }else{
      this.router.navigate(['/Home']);
    }

    }, (err)=>{
      console.log(err.error.data);
      this.errormessage = err.error.data
    })


  }


}
