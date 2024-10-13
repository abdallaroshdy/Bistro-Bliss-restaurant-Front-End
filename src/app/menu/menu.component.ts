import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {seccessfullResponse} from '../user-registeration/user-registeration.component'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NavComponent, FooterComponent,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'

})
export class MenuComponent implements OnInit {

  http = inject(HttpClient)
  items:item[] = []
  filteredItems:item[] = []

  catigory: string = 'All';

  constructor(private router: Router ,private route: ActivatedRoute) {}


  ngOnInit(): void {



    this.http.get("http://localhost:3220/user/checkNormalUser", { withCredentials: true }).subscribe((data)=>{} , (err)=>{
      console.log(err);
      if(err.status === 401){
        this.router.navigate(['/login']);
        return;
      }
    })


    this.http.get<seccessfullResponse>("http://localhost:3220/menu/", { withCredentials: true }).subscribe((data) => {

      this.items = data.data;
      this.filteredItems = this.items;
      console.log(this.items);
      this.route.queryParams.subscribe(params => {
        this.catigory = params['cat'];
      });

      if(this.catigory){
        this.filteredItems = this.items.filter(item => item.catigory === this.catigory);
      }else{
        this.catigory = 'All'
      }

    }, (err) => {

      console.log(err);
      if (err.status === 401) {
        this.router.navigate(['/login']);
        return;
      }
    })
console.log(this.catigory);
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

}




interface item{
  title : string,
  price : number,
  desc : string,
  catigory : string,
  imgUrl:string
}
