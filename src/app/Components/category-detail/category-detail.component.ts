import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router , ActivatedRoute, Params} from '@angular/router';
//Service
import { ImageControllerService } from './../Service/image-controller.service';

@Component({
	selector: 'app-category-detail',
	templateUrl: './category-detail.component.html',
	styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit,OnDestroy {
	private sub  : Subscription;
	private subParams : Subscription;
	images : any[] = [];

	constructor(
		private activatedRouter : ActivatedRoute,
		public router : Router,
		private imgService : ImageControllerService
		) { }

	ngOnInit() {
		this.subParams = this.activatedRouter.params.subscribe((data : Params) => {
			this.getAllImageCate(data['name']);
		})
	}

	ngOnDestroy(){
		if(this.sub) this.sub.unsubscribe();
	}
	getAllImageCate(catename) {
		this.sub = this.imgService.getDetailCategory(catename).subscribe(data => {
			let result : any = data;
			for(let i=0; i<result.length; i++){
				this.images.push(result[i]);
			}
		})
	}
	ClickAvatar(iduser){
		this.router.navigate([`profile/${iduser}`]);
	}

}
