import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { appRoutes } from './routes.app';


import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { MainContentComponent } from './Components/main-content/main-content.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { CollectionComponent } from './Components/collection/collection.component';
import { AdminComponent } from './Components/admin/admin.component';
//Service
import { UserService } from './Components/Service/user.service';
import { ImageControllerService } from './Components/Service/image-controller.service';
import { AdminAuthGuard } from './Components/Service/admin-auth.guard';
import { CategoryDetailComponent } from './Components/category-detail/category-detail.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';


@NgModule({
  declarations: [
  AppComponent,
  HeaderComponent,
  MainContentComponent,
  CategoriesComponent,
  ProfileComponent,
  NotFoundComponent,
  HomeComponent,
  AdminComponent,
  CollectionComponent,
  CategoryDetailComponent,
  FooterComponent,
  LoginComponent,
  SignupComponent

  ],
  imports: [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  RouterModule.forRoot(appRoutes)
  ],
  providers: [
  UserService,
  ImageControllerService,
  AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
