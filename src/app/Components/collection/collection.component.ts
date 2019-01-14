import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router , ActivatedRoute, Params} from '@angular/router';
declare var $: any;
import axios from "axios";
//Model 
import { Image2 } from "./../../Models/Image2.Model";
//Service
import { ImageControllerService } from "./../Service/image-controller.service";
import { UserService } from "./../Service/user.service";
@Component({
	selector: 'app-collection',
	templateUrl: './collection.component.html',
	styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit,OnDestroy {
	private URLcloud : string  = "https://api.cloudinary.com/v1_1/pronamvip1998/upload";
	private upload_preset : string = "nqxqdmd8";
	private file : File ;
	private sub : Subscription;
	private subgetavatar : Subscription;
	private subgetfullname : Subscription;
	private subimg : Subscription;
	private subParams : Subscription;
	private idDeleted :number;
	private avatar : string ;
	private fullname : string ;
	private boss : boolean = false;
	private nameimg : string ;
	ImageClick : string ;
	imgUrl : any[] = [
	];
	constructor(
		private imageService : ImageControllerService,
		private userService : UserService,
		private activatedRouter : ActivatedRoute,
		public router : Router,
		) { }

	ngOnInit() {
		this.subgetfullname = this.userService.getProfile(localStorage.getItem('id')).subscribe(data => {
			this.fullname = data.fullname;
		})
		this.subgetavatar = this.imageService.getAvatar(parseInt(localStorage.getItem('id'))).subscribe( data => {
			if(data){
				let result : any = data;
				this.avatar = result[result.length - 1].image;}
			})
		let ipupload = document.getElementById("ipupload");
		let btnupload = document.getElementById("modalupload");
		btnupload.addEventListener('click', () => {
			$('.modal').css('display','block');
		})
		window.onclick = (e) => {
			if (e.target == document.querySelector('.modal')) {
				$('.modal').css("display", "none");
			}
			if (e.target == document.querySelector('.modal-click')) {
				$('.modal-click').css("display", "none");
			}
		}

		$('#btnchoose').click(()=>{
			$('#ipupload').click();
		})

		this.GetAllImageForUser();
	}
	GetAllImageForUser(){
		this.subParams = this.activatedRouter.params.subscribe((data : Params) =>{
			if(data['id'] !== localStorage.getItem('id')){
				this.subimg = this.imageService.getImagesUser(data['id']).subscribe(data => {
					this.imgUrl = data;
					$('#modalupload').css('display','none');
				})
			}else{
				$('#modalupload').css('display','block');
				this.boss = true;
				this.subimg = this.imageService.getImagesUser(parseInt(localStorage.getItem('id'))).subscribe(data => {
					this.imgUrl = data;
				})
			}

		});
		
	}
	//NgONDestroy
	ngOnDestroy(){
		if(this.sub) this.sub.unsubscribe();
	}

	OnFileSelected(event){
		var reader = new FileReader();

		reader.onload = () => {
			var image = document.getElementById('imageupload');
			image.src = reader.result;
		}
		reader.readAsDataURL(event.target.files[0]);
		this.file = event.target.files[0];
	}


	OnUpload(){
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
			let imageUser = new Image2();
			imageUser.iduser = parseInt(localStorage.getItem('id'));
			imageUser.image =  res.data.secure_url;
			imageUser.category = $('#selected').val();
			imageUser.fullname = this.fullname;
			imageUser.avatar = this.avatar;
			imageUser.nameimg = $('#stt').val();
			this.sub = this.imageService.UpdateImage(imageUser).subscribe(data3 =>{
				$('.modal').css("display", "none");
				this.imgUrl.unshift({image:data3.image});
			})
		}).catch ( (err) =>{
			console.log(err);
		})
	}

	
	ClickImage(item : string ) {
		$('.modal-click').css('display','block');
		this.ImageClick = item;
	}
	//Deleted
	OnClickTrast(iduser){
		$('.modal3').css('display','block');
		this.idDeleted = iduser;
	}
	OnClickOK(){
		this.sub = this.imageService.DeletedImage(this.idDeleted).subscribe(data => {
			this.GetAllImageForUser();
			$('.modal3').css('display','none');
		})
	}
	OnClickClose(){
		$('.modal3').css('display','none');
	}
	
}


