import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $: any;
//service 
import { UserService } from './../service/user.service';
import { ImageControllerService } from './../Service/image-controller.service';
//Model 
import { Image2 } from './../../Models/Image2.Model';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
	public isSignup: boolean = false;
	public isComebackLogin: boolean = false;
	private loginfalse: boolean = false;
	private search : string ;

	//content
	@Input('isClickSignup') isclicksignup: boolean;
	public sub: Subscription;
	public subsignup: Subscription;
	protected id: string;
	private usernameAvailable : boolean = false;
	private repwdfalse : boolean = false;
	private signupsuccess : boolean = false;
	private ImgAll : Image2[] ;
	private ImgresultSearch : Image2[];
	constructor(
		private userService: UserService,
		private router: Router,
		private imageService : ImageControllerService
		) {}

	ngOnInit() {
		this.sub = this.imageService.getAllImage().subscribe(data => {
			let result : any = data;
			this.ImgAll = result;
		});
		this.id = localStorage.getItem('id');
		if (localStorage.getItem('id') !== null) {
			this.formcontrolfortologin();
		}
		//Get All Image For Search
		//js
		document.getElementById('login').addEventListener('click', () => {
			$('.modal-login').css("display", "block");
			$('nav').removeClass('active');

		}, false);
		window.onclick = (e) => {
			if (e.target == document.querySelector('.modal-login')) {
				$('.modal-login').css("display", "none");
				this.isComebackLogin = true;
				this.isSignup = false;
			}
		}
		$('#ippwd').keyup( () => {
			this.loginfalse = false;
		})
		
		$('#ipusername').keyup(() => {
			this.loginfalse = false;
			this.usernameAvailable = false;
		})
		$(document).ready(function() {
			$('.menu-toggle').click(function() {
				$('nav').toggleClass('active');
			})
		})

		$('#li-user').click(function() {
			$('#li-user').toggleClass('active');
		})
		$('#closemodal').click(() => {
			$('.modal-login').css("display", "none");
		})
		// end js 
	}
	
	ngOnChanges() {
		if (this.isclicksignup) {
			$('.modal-login').css("display", 'block');
		}

	}


	signupform() {
		this.isSignup = true;
		this.isComebackLogin = true;
	}
	loginform() {
		this.isComebackLogin = false;
		this.isSignup = false;

	}
	clickSignup() {
		this.signupform();
	}
	clickbtnLogin() {
		this.loginform();
		this.signupsuccess = false;
	}
	OnSubmit(data: any) {
		if (this.isSignup === false) {
			this.sub = this.userService.getUser(data.username).subscribe(datauser => {
				let result : any = datauser;
				if (result.length !== 0) {
					if (data.pwd === datauser[0].password) {
						this.formcontrolfortologin();
						localStorage.setItem('id', datauser[0].id.toString());
						this.id = (localStorage.getItem('id'));
					}
					else {
						this.loginfalse = true;
					}
				}
				else {
					this.loginfalse = true;
				}
			}, error => {
				this.userService.HandleError(error);
			}
			)
		}
		else {
			if (this.userService.Checkusername(data.username)){
				if (data.repwd === data.pwd) {
					let signupinfo = new LoginUser(data.username, data.pwd);
					this.subsignup = this.userService.OnSignUp(signupinfo).subscribe(data => {
						this.signupsuccess = true;
					});
					
				}
				else{
					this.repwdfalse = true;
				}
			}
			else{
				this.usernameAvailable = true;
			}

		}
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
		if (this.subsignup) this.subsignup.unsubscribe();
	}
	formcontrolfortologin() {
		$('li#li-user').css("display", 'block');
		$('header nav ul li.logout').css("display", 'block');
		$('.modal-login').css("display", 'none');
		$('#login').css("display", 'none');
	}
	formcontrolfortologout() {
		localStorage.removeItem('id');
		$('#login').css("display", 'block');
		$('li#li-user').css("display", 'none');
		$('header nav ul li.logout').css("display", 'none');
	}
	OnLogout() {
		this.router.navigate(['']);
		this.formcontrolfortologout();
	}

	OnKeySearch(data){
		let result : any;
		if(data.target.value){
			$('main').css('display','block');
			result = this.ImgAll.filter(x => {
				return x.nameimg.toLowerCase().indexOf(data.target.value.toLowerCase()) != -1;
			});
		}
		else{
			$('.boxsearch').css('display','none');
		}
		this.ImgresultSearch = result;
	}
}
