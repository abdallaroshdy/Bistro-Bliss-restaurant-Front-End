import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BookComponent } from './book/book.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SingleItemComponent } from './admin-page/all admin component/single-item/single-item.component';
import { UserRegisterationComponent } from './user-registeration/user-registeration.component';
import { AddNewItemComponent } from './admin-page/all admin component/add-new-item/add-new-item.component';
import { AllBooksComponent } from './admin-page/all admin component/all-books/all-books.component';
import { ContcatsComponent } from './admin-page/all admin component/contcats/contcats.component';

export const routes: Routes = [
  {
    path:'',
    component:LoginPageComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'Home',
    component:HomeComponent
  },
  {
    path:'menu',
    component:MenuComponent
  },
  {
    path:'Menu',
    component:MenuComponent
  },
  {
    path:'book',
    component:BookComponent
  },
  {
    path:'Book',
    component:BookComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'Contact',
    component:ContactComponent
  },
  {
    path:'Login',
    component:LoginPageComponent
  },
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path:'Registeration',
    component:UserRegisterationComponent
  },
  {
    path:'registeration',
    component:UserRegisterationComponent
  },
  {
    path:'adminPage',
    component:AdminPageComponent
  },
  {
    path:'adminPage/:Iid',
    component:SingleItemComponent
  },
  {
    path:'addNewItem',
    component:AddNewItemComponent
  },
  {
    path:'books',
    component:AllBooksComponent
  },
  {
    path:'contacts',
    component:ContcatsComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];
