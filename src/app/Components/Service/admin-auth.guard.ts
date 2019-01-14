import { Injectable,OnDestroy} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable,Subscription } from 'rxjs';
import { UserService } from './user.service';
import { Admin } from './../../Models/Admin.Model';
@Injectable({
	providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate,OnDestroy{
	public sub :Subscription;
	private checkadmin : boolean ;
	constructor(
			private userService : UserService
		){
		this.checkadmin = false;
	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		this.sub = this.userService.CheckAdmin().subscribe( data => {
			let result : any = data;
			for(let i=0;i<result.length ; i++){
				if(result[i]['id'] == localStorage.getItem('id')){
					this.checkadmin = true;
				}
			}
			return false;
		})
		if (parseInt(localStorage.getItem('id')) == 1){
			return true;
		}

	}
	ngOnDestroy(){
		this.sub.unsubscribe();
	}
	}
	
