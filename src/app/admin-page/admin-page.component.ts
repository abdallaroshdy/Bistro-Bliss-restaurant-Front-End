import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { seccessfullResponse } from '../user-registeration/user-registeration.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{

  http = inject(HttpClient)
  items:item[] = []
  filteredItems:item[] = []
  catigory: string = 'All';

  // constructor(){
  //   for(let i=0 ;i<20;i++){
  //     this.items.push(i)
  //   }
  // }

  constructor(private router: Router ,private cookieService: CookieService) {}




  ngOnInit(): void {

    this.http.get("http://localhost:3220/user/checkAdmin", { withCredentials: true }).subscribe((data)=>{} , (err)=>{
      console.log(err);
      if(err.status === 401){

        this.router.navigate(['/login']);
        return;
      }
    })


    this.http.get<seccessfullResponse>("http://localhost:3220/menu/", { withCredentials: true }).subscribe((data)=>{
      // console.log(data);
      this.items = data.data
      this.filteredItems = this.items;
      console.log(this.items);
    },(err)=>{
      if(err.status === 401){
        console.log(err);
        this.router.navigate(['/login']);
        return;
      }
    })
  }

  filterCategory(cat : string){
    this.catigory = cat
    if(cat == "All"){
      this.filteredItems = this.items;
    }else {
      this.filteredItems = this.items.filter(item => item.catigory === cat);

    }
    console.log(this.catigory);
  }




  getItem(id:string){
    this.router.navigate(['/adminPage/'+id]);
    return;
  }

  deleteItem(id:string){
    this.http.delete("http://localhost:3220/menu/"+id , {withCredentials :  true}).subscribe((data)=>{
      console.log(data);
      this.items = this.items.filter(item => item._id !== id);
      this.filterCategory(this.catigory)

    },(err)=>{
      console.log(err);
      if(err.status === 401){
        this.router.navigate(['/login']);
        return;
      }
    })

  }

  deleteCookie(): void {
    this.cookieService.delete('jwd');
    this.router.navigate(['/']);
  }


  navToAdd(){
    this.router.navigate(['/addNewItem']);
  }

  navToBooks(){
    this.router.navigate(['/books']);
  }

  navToContacts(){
    this.router.navigate(['/contacts']);
  }

}



interface item{
  title : string,
  price : number,
  desc : string,
  catigory : string,
  imgUrl:string,
  _id : string
}
