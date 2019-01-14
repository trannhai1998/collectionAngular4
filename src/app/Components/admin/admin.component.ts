import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import axios from "axios";
//Model
import { User } from './../../Models/user.model';
import { Slide } from './../../Models/Slide.Model';
//Service 
import { UserService } from './../Service/user.service';
import { ImageControllerService } from './../Service/image-controller.service';
declare var $: any;

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {
	private sub : Subscription;
	private subdeleted : Subscription;
	private users : User[];
	private search : string ;
	private usersearch : User[];
	private color : string;
	ImgSlide : any =[];
	private file : File ;
	private URLcloud : string  = "https://api.cloudinary.com/v1_1/pronamvip1998/upload";
	private upload_preset : string = "nqxqdmd8";
	constructor(
		private userService : UserService,
		private imageService : ImageControllerService
		) { }

	ngOnInit() {
		this.getAllSlides();
	}
	ngOnDestroy(){
		if(this.sub) this.sub.unsubscribe();
		if(this.subdeleted) this.subdeleted.unsubscribe();

	}
	Onclickalluser(){
		this.sub = this.userService.getAllUser().subscribe(data =>{
			this.users = data;
		})
	}
	OnDeleted(id : string){
		this.subdeleted = this.userService.DeletedUserAdmin(id).subscribe( (data : User )=>{

		})
		this.subdeleted = this.userService.DeletedLoginAdmin(id).subscribe( data => {
			
		})
		this.clearRow(parseInt(id));
	}
	clearRow(id : number){
		for(let i=0 ; i < this.users.length ; i++){
			if (this.users[i].id == id ){
				this.users.splice(i,1);	
				break;
			}
		}
	}
	clearRow2(id : number){
		for(let i=0 ; i < this.ImgSlide.length ; i++){
			if (this.ImgSlide[i].id == id ){
				this.ImgSlide.splice(i,1);	
				break;
			}
		}
	}

	OnKeySearch(data){
		this.sub = this.userService.getAllUser().subscribe(data =>{
			this.usersearch = data;
		})
		let result : any;
		if ( data.target.value ){
			result = this.usersearch.filter(x => {
				return x.fullname.toLowerCase().indexOf(data.target.value.toLowerCase()) != -1;
			});
			this.users = result;
			result = '';
		}
	}
	getAllSlides(){
		this.sub = this.imageService.getAllSlide().subscribe(data => {
			this.ImgSlide = data;
		})
	}
	onClickAddSlide(){
		$('#btnfile').click();
	}
	OnFileSelected(event){
		this.file = event.target.files[0];
		console.log(event.target.files[0]);
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
		}).then((res) => {
			console.log(res)
			let slide = new Slide();
			slide.link = res.data.secure_url;
			console.log(res);
			this.sub = this.imageService.updateSlide(slide).subscribe(data => {
				this.ImgSlide.push(data);
			})
		}).catch( err =>{
			console.log(err);
		})
	}
	OnDeletedSlide(id){
		this.sub = this.imageService.deletedSlide(id).subscribe(data => {
			this.clearRow2(id);
		});
	}
}