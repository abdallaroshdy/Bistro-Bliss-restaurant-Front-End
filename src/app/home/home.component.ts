import { Component, inject, OnInit } from '@angular/core';
import { FirstSectionHomeComponent } from './home components/first-section-home/first-section-home.component';
import { SecondSectionHomeComponent } from './home components/second-section-home/second-section-home.component';
import { ThirdSectionHomeComponent } from './home components/third-section-home/third-section-home.component';
import { NavComponent } from "../nav/nav.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FirstSectionHomeComponent, SecondSectionHomeComponent, ThirdSectionHomeComponent, NavComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [CookieService]
})
export class HomeComponent implements OnInit{

  http = inject(HttpClient)

  constructor(private router: Router , private cookieService: CookieService) {}

  ngOnInit(): void {
    this.http.get("http://localhost:3220/user/checkNormalUser", { withCredentials: true }).subscribe((data)=>{} , (err)=>{
      console.log(err);
      if(err.status === 401){
        this.router.navigate(['/login']);
        return;
      }
    })

    // const cookieValue = this.cookieService.get('cookieName');
    // console.log('Cookie Value: ', cookieValue);
  }



}
