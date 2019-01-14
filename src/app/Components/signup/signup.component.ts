import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
//Model
import { User } from './../../Models/user.model';
declare var $: any;
//Service 
import { UserService } from './../Service/user.service';
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
	private message : string ;
	private sub : Subscription;
	private user : User;
	constructor(
		public userService : UserService,
		public router : Router
		) { }

	ngOnInit() {
		this.user = new User();

	}
	ngOnDestroy() {
		if(this.sub) this.sub.unsubscribe();
	}
	OnSubmitSignup(data ){
		if(data.username = "" ||data.fullname == "" || data.pwd == ""  || data.repwd == ""  
			|| data.address == ""){
			this.message = "Xin Nhập Đầy Đủ Thông Tin";
	}
	else{
		if(data.pwd !== data.repwd){
			this.message = "Mật Khẩu Không Trùng Khớp";
		}
		else {
			this.sub = this.userService.getUser($('#username').val()).subscribe(data2 => {
					let result : any = data2;
					if(result.length > 0){
							this.message = " Tên Tài Khoản Đã Có Người Sử Dụng";
						}
						else {
						this.user = new User(data.fullname,data.username,data.pwd,data.date,data.address);
						this.user.username = $('#username').val();
						this.sub = this.userService.OnSignUp(this.user).subscribe(data =>{
							localStorage.setItem('username',data.username);
							this.router.navigate(['/login']);

						})
					}

				})
			}
		}
	}
}
