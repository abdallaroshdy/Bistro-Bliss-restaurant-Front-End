import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRegisterationComponent } from "./user-registeration/user-registeration.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule , NavComponent, HomeComponent, FooterComponent, LoginPageComponent, UserRegisterationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FoodWebsiteProject';
}
