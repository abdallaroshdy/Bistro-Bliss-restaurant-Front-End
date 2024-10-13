// import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-new-item',
  standalone: true,
  imports: [FormsModule , RouterLink],
  templateUrl: './add-new-item.component.html',
  styleUrl: './add-new-item.component.css'
})
export class AddNewItemComponent {

  item = {

    title: '',
    price: null,
    desc: '',
    catigory: '',
    imgUrl:null
  }


  allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

  http = inject(HttpClient)

  alertMessage: string = ''
  showAlert :boolean = false
  messageType = ''


  constructor(private router: Router ,private cookieService: CookieService) {}




  ngOnInit(): void {

    this.http.get("http://localhost:3220/user/checkAdmin", { withCredentials: true }).subscribe((data)=>{} , (err)=>{
      console.log(err);
      if(err.status === 401){

        this.router.navigate(['/login']);
        return;
      }
    })

  }


  onSubmit() {
    console.log('Item added:', this.item);
    if(this.item.catigory == '' ||this.item.title == '' ||this.item.desc == ''  ||this.item.price == null  ||this.item.imgUrl == null){
      // alert('Invalid file type. Plz upload an image file (JPG, PNG, GIF, or SVG).');
      this.showAlertMessage('Please fill in all the fields.', 'danger');
      return
    }else if(this.item.price<=0){
      this.showAlertMessage('Price should be grater than 0', 'danger');
      return
    }


    const formData = new FormData();
    formData.append('title', this.item.title);
    formData.append('price', this.item.price);
    formData.append('desc', this.item.desc);
    formData.append('catigory', this.item.catigory);
    formData.append('imgUrl', this.item.imgUrl);


    this.http.post("http://localhost:3220/menu" , formData , { withCredentials: true }).subscribe((data)=>{

      // alert('Item successfully added:'+ data);
      this.showAlertMessage('Item successfully added', 'success');

    } , (err)=>{
      console.log(err);
      if(err.status === 401){

        this.router.navigate(['/login']);
        return;
      }else if(err.status === 400){

        this.showAlertMessage(err.error.data[0], 'danger');

      }
    })


  }


  onImageUpload(event: any) {

    const file = event.target.files[0];

    console.log('Image uploaded:', file);
    if (this.allowedImageTypes.includes(file.type)) {
      this.item.imgUrl = file;
      console.log('Image uploaded:', file);
    } else {
      this.showAlertMessage('Invalid file type. Plz upload an image file (JPG, PNG, GIF, or SVG).', 'danger');
      event.target.value = ''
      this.item.imgUrl = null
    }

  }

  showAlertMessage(message: string, type: string ) {
    this.alertMessage = message;
    this.showAlert = true;
    this.messageType = type
  }

}


