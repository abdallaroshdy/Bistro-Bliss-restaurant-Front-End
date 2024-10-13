import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-second-section-home',
  standalone: true,
  imports: [],
  templateUrl: './second-section-home.component.html',
  styleUrl: './second-section-home.component.css'
})
export class SecondSectionHomeComponent {

  constructor(private router:Router){}

  navigateToMenu(catigory:string){
    this.router.navigate(['/menu'], { queryParams: { cat: catigory } });
  }
}
