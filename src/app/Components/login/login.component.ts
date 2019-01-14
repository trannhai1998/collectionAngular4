import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
//Model
import { User } from './../../Models/user.model';
//Service 
import { UserService } from './../Service/user.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
	public message : string;
	public sub : Subscription;
	constructor(
		public router : Router,
		public userService : UserService
		) { }

	ngOnInit() {
		if(localStorage.getItem('username')){
			this.message = "SignUp Success. Please Login Here !";
		}
	}
	ngOnDestroy(){
		if(this.sub) this.sub.unsubscribe();
	}
	OnSubmitLogin(data : any){
		if(data.username == "" || data.pwd == ""){
			this.message = "Xin Nhập Đầy Đủ Thông Tin";
		}
		else{
			this.sub = this.userService.getUser(data.username).subscribe(datauser => {
				if(datauser){
					console.log(datauser);
					if(data.pwd === datauser[0].password){
						localStorage.setItem('id',datauser[0].id.toString());
						localStorage.removeItem('username');
						this.router.navigate(['/']);

					}
				}
				else{
					this.message = "Username Không Tồn Tại";
				}
			})
		}
	}
}
