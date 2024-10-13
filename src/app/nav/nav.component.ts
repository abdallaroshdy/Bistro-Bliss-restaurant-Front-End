import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [CookieService]
})
export class NavComponent {
  email : string = "yummy@bistrobliss"


  constructor(private cookieService: CookieService) {}

  deleteCookie(): void {
    this.cookieService.delete('jwd');
  }

}
