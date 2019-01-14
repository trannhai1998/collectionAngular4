import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router , ActivatedRoute, Params} from '@angular/router';
//Model
import { User } from './../../Models/user.model';
import { Avatar } from "./../../Models/Avatar.Model";

//Service
import { UserService } from './../Service/user.service';
import { ImageControllerService } from "./../Service/image-controller.service";
//module
import axios from "axios";
declare var $: any;
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
	private sub  : Subscription;
	private subParams : Subscription;
	private subava : Subscription;
	private user : User;
	private haveprofile : boolean = true;
	private formUpdate : boolean = true;
	private id : number;
	private checkthefirst : number = 0;
	private subUpdate : Subscription;
	private updatesuccess : boolean = false;
	//cloud
	private URLcloud : string  = "https://api.cloudinary.com/v1_1/pronamvip1998/upload";
	private upload_preset : string = "nqxqdmd8";
	private file : File;
	// End cloud
	//avatar 
	imgAvatar : any ;
	private visiter : boolean = false;

	constructor(
		private userService : UserService,
		private activatedRouter : ActivatedRoute,
		public router : Router,
		public imageService : ImageControllerService
		) { }

	ngOnInit() {
		this.user = new User();
		this.loadData();
		$('#btnavatar').click( () => {
			$('#ipavatar').click();
		});


	}

	ngOnDestroy(){
		if(this.sub)this.sub.unsubscribe();
		if(this.subParams)this.subParams.unsubscribe();
		if (this.subUpdate) this.subUpdate.unsubscribe();
		if ( this.subava ) this.subava.unsubscribe();
	}
	loadData(){
		this.subParams = this.activatedRouter.params.subscribe((data : Params) =>{
			if(localStorage.getItem('id')){
				if(data['id'] != localStorage.getItem('id')){
					this.sub = this.userService.getProfile(data['id']).subscribe( (dataprofile : User) => {
						this.checkthefirst = 0 ;
						this.user = dataprofile;
						$('#updatebtn').css('display','none');
						this.subava = this.imageService.getAvatar(data['id']).subscribe( data => {
							if(data){
								let result : any = data;
								this.imgAvatar = result[result.length - 1].image;}
							})
					})
				}
				else {
					$('#updatebtn').css('display','block');
					this.sub = this.userService.getProfile(localStorage.getItem('id')).subscribe( (dataprofile : User) => {
						this.checkthefirst = 0 ;
						this.user = dataprofile;
					})
					this.subava = this.imageService.getAvatar(localStorage.getItem('id')).subscribe( data => {
							if(data){
								let result : any = data;
								this.imgAvatar = result[result.length - 1].image;}
							})
				}
			}else{
				this.router.navigate([`/login`]);
			}
		}
		)
	}
	OnUpdate(){
		this.formUpdate = true;
		this.haveprofile = true;
	}
	Update(){
		if(this.checkthefirst == 1){
			this.user.id = this.id;
			this.subUpdate = this.userService.theFirstUpdate(this.user).subscribe( data => {
				this.updatesuccess = true;
				setTimeout(()=>{
					this.updatesuccess = false;
				},3000)
			})
		}
		else{

			this.subUpdate = this.userService.UpdateProfile(this.user).subscribe( data => {
				this.updatesuccess = true;
				setTimeout(()=>{
					this.updatesuccess = false;
				},3000)
			})
		}
	}

	OnAvatar(event){
		var reader = new FileReader();
		this.file = event.target.files[0];
		let form = new FormData();
		form.append('file',this.file);
		form.append('upload_preset',this.upload_preset);
		
		axios({
			url: this.URLcloud,
			method:'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data : form
		}).then( (res) => {
			let avatarUser = new Avatar();
			avatarUser.iduser = parseInt(localStorage.getItem('id'));
			avatarUser.image =  res.data.secure_url;
			this.sub = this.imageService.UpdateAvatar(avatarUser).subscribe(data =>{
				this.imgAvatar = data.image;
				
			})
		}).catch ( (err) =>{
			console.log(err);
		})
	}
}
