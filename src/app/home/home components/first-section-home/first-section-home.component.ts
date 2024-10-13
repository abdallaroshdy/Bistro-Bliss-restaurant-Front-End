import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-section-home',
  standalone: true,
  imports: [],
  templateUrl: './first-section-home.component.html',
  styleUrl: './first-section-home.component.css'
})
export class FirstSectionHomeComponent {

  constructor(private router:Router){}

  navigateToMenu(){
    this.router.navigate(['/menu']);
  }
  navigateToBookAtable(){
    this.router.navigate(['/book']);
  }

}
