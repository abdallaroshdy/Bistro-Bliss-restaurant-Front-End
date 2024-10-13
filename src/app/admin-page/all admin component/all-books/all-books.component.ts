import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent {


  http = inject(HttpClient)

  Books :any

  sort = 0

  constructor(private router: Router ) {}

  ngOnInit(): void {

    this.http.get<response>("http://localhost:3220/bookATable/", { withCredentials: true }).subscribe((data)=>{

    this.Books = data.data

    this.Books.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

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

  getTime(datee: string): string {
    const date = new Date(datee);
    const timeOnly = date.toISOString().split('T')[1].split('.')[0].split(':').slice(0, 2).join(':');
    // console.log(timeOnly);
    return timeOnly;
  }

  sortDate(){

    if(this.sort ==0){
      this.sort = 1
      this.Books.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }else{
      this.sort = 0
      this.Books.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

  }



}

export interface response {
  status : string,
  data:any
}
