import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
	imgUrl : any = [
	"./../../../assets/img/cateLife.jpg",
	"./../../../assets/img/cateYourCity.jpg",
	"./../../../assets/img/fashion.jpg",
	"./../../../assets/img/roi-nuoc-mat-nhung-dong-vat-bi-hoi-chung-down.jpg",
	];
	constructor() { }

	ngOnInit() {
	}

}
