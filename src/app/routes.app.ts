import { Routes } from '@angular/router';
//Components
import { ProfileComponent } from './Components/profile/profile.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { MainContentComponent } from './Components/main-content/main-content.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { AdminComponent } from './Components/admin/admin.component';
import { CategoryDetailComponent } from './Components/category-detail/category-detail.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
//service
import { AdminAuthGuard } from './Components/Service/admin-auth.guard';

export const appRoutes : Routes = [
{	
	path:'',
	component : HomeComponent
},
{
	path:'profile/:id',
	component : ProfileComponent
},
{
	path : 'admin/:id',
	component : AdminComponent,
	canActivate : [AdminAuthGuard]
},
{
	path : 'category/:name',
	component: CategoryDetailComponent
},
{
	path:'login',
	component : LoginComponent
},
{
	path:'signup',
	component : SignupComponent
},
{
	path : '**',
	component: NotFoundComponent
}
]