import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import{response} from "../all-books/all-books.component"

@Component({
  selector: 'app-contcats',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contcats.component.html',
  styleUrl: './contcats.component.css'
})
export class ContcatsComponent {

  http = inject(HttpClient)

  contact :any

  constructor(private router: Router ) {}

  ngOnInit(): void {

    this.http.get<response>("http://localhost:3220/contact/", { withCredentials: true }).subscribe((data)=>{

    this.contact = data.data

    this.contact.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    } , (err)=>{
      console.log(err);
      if(err.status === 401){

        this.router.navigate(['/login']);
        return;
      }
    })
  }


  getDate(datee:string){
    const date = new Date(datee);

    const dateOnly = date.toISOString().split('T')[0];
    // console.log(dateOnly)
    return dateOnly
  }

}


