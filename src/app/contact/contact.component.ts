import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavComponent, FooterComponent , FormsModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  subject=''
  message=''

  http = inject(HttpClient)

  messageType: string = ''
  alertMessage: string = ''

  showAlert: boolean = false


  constructor(private router: Router) {}

  ngOnInit(): void {

    this.http.get("http://localhost:3220/user/checkNormalUser", { withCredentials: true }).subscribe((data)=>{} , (err)=>{
      console.log(err);
      if(err.status === 401){
        this.router.navigate(['/login']);
        return;
      }
    })


  }


  onSubmit(){
    console.log(this.subject);
    if(!this.subject || !this.message){
      this.showAlertMessage('Please Enter subject date and message.', 'danger');
      return;
    }

    const requestData = {
      subject: this.subject,
      message: this.message
    }

    this.http.post("http://localhost:3220/contact/" , requestData , {withCredentials : true}).subscribe((data)=>{

      this.showAlertMessage('Your message successfully sended!', 'success')
      this.message =''
      this.subject =''

    }, (err)=>{

      console.log(err);

        if(err.status === 401){

          this.router.navigate(['/login']);
          return;
        }else if(err.status === 400){

          this.showAlertMessage(err.error.data[0], 'danger');

        }
      })

  }


  showAlertMessage(message: string, type: string): void {
    this.alertMessage = message;
    this.messageType = type;
    this.showAlert = true;
  }

}
