import { HttpClient } from '@angular/common/http';
import { inject,Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrls: ['./user-registeration.component.css'],
  imports: [FormsModule],
  standalone: true
})




export class UserRegisterationComponent {


  http = inject(HttpClient)

  otpPage = false

  errormessage:string | null = null;
  successMessage:string | null = null;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';
  phonenum: string = '';
  gender: string = '';


  otpErrorMessage = null
  otpSuccessMessage = null
  otp : number = 0

  constructor(private router: Router) {}

  makeNewUser(){
    this.errormessage = null

    if(this.firstName == '' || this.lastName == '' || this.email == '' || this.password1 == '' || this.password2 == '' || this.phonenum == '' || this.gender == ''   ){
      this.errormessage = "You Should Enter all input fields"
      return ;
    }else if(this.password1 != this.password2){
      this.errormessage ='Passwords do not match';
      return;
    }
    let data = {
      firstname : this.firstName,
      lastname : this.lastName,
      email : this.email,
      password : this.password1,
      phonenumber : this.phonenum,
      gender : this.gender
    }

    console.log(data);

    this.http.post<seccessfullResponse>("http://localhost:3220/user/register" , data).subscribe((dat)=>{
      this.otpSuccessMessage = dat.data
      if(dat.status == "Pending"){
        this.otpPage=true
      }
    } , (err)=>{
      this.errormessage = err.error.data[0]
    })
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }


  verifyOtp(){
    this.otpErrorMessage = null
    this.otpSuccessMessage = null

    this.http.post<seccessfullResponse>("http://localhost:3220/user/verifyotp" , {email : this.email, otp : this.otp}).subscribe((dat)=>{
      this.successMessage = dat.data
      this.otpPage = false
    } , (err)=>{
      this.otpErrorMessage = err.error.data[0]
    })
  }

  resendOtp(){
    this.otpErrorMessage = null
    this.otpSuccessMessage = null
    this.http.post<seccessfullResponse>("http://localhost:3220/user/ResendOTP" , {email : this.email }).subscribe((dat)=>{
      this.otpSuccessMessage = dat.data
    } , (err)=>{
      this.otpErrorMessage = err.error.data[0]
    })
  }


}



export interface seccessfullResponse {
  status:string
  data: any;
}
