import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { seccessfullResponse } from '../../../user-registeration/user-registeration.component';

@Component({
  selector: 'app-single-item',
  standalone: true,
  imports: [FormsModule ,RouterLink],
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css'] // Fix styleUrl to styleUrls
})
export class SingleItemComponent implements OnInit {

  Iid!: string;

  title  = ''
  price  = null
  desc  =''
  catigory = ''
  imgUrl  = null
  img = ''

  categories = ['Breakfast', 'Main Dish', 'Drink', 'Dessert']

  allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

  http = inject(HttpClient)

  alertMessage: string = ''
  showAlert :boolean = false
  messageType = ''


  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.Iid = params.get('Iid')!;
      console.log(this.Iid);


      this.http.get<seccessfullResponse>(`http://localhost:3220/menu/${this.Iid}`, { withCredentials: true }).subscribe((data) => {
        console.log(data.data);
        this.title = data.data.title
        this.desc = data.data.desc
        this.price = data.data.price
        this.catigory = data.data.catigory
        this.img = "http://localhost:3220/" + data.data.imgUrl
      }, (err) => {
        console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
          return;
        }
      });
    });
  }

  onSubmit(){

    this.alertMessage = ''

    if(this.title == '' ||this.price == null ||this.desc == '' ||this.catigory == ''  ){
      this.showAlertMessage('Please fill in all the fields.', 'danger');
      return
    }else if(this.price<=0){
      this.showAlertMessage('Price should be grater than 0', 'danger');
      return
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('price', this.price);
    formData.append('desc', this.desc);
    formData.append('catigory', this.catigory);

    if(this.imgUrl!=null){
      formData.append('imgUrl', this.imgUrl);
    }

    this.http.patch<seccessResponse>("http://localhost:3220/menu/"+this.Iid , formData , { withCredentials: true }).subscribe((data)=>{

      this.showAlertMessage('Item successfully Updated', 'success')
      this.img = "http://localhost:3220/" + data.img

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


  onImageUpload(event: any) {

    const file = event.target.files[0];

    console.log('Image uploaded:', file);
    if (this.allowedImageTypes.includes(file.type)) {
      this.imgUrl = file;
      console.log('Image uploaded:', file);
    } else {
      this.showAlertMessage('Invalid file type. Plz upload an image file (JPG, PNG, GIF, or SVG).', 'danger');
      event.target.value = ''
      this.imgUrl = null
    }

  }

  showAlertMessage(message: string, type: string ) {
    this.alertMessage = message;
    this.showAlert = true;
    this.messageType = type
  }


}


export interface seccessResponse {
  status:string ;
  data: any;
  img :string ;
}

// interface item{
//   title : string,
//   price : number,
//   desc : string,
//   catigory : string,
//   imgUrl:string
// }
