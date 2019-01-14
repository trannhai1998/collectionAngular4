import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public isclkSignup : boolean = false;
	constructor() { }
	imgUrl : "./../../../assets/img/not-found.jpg";
	ngOnInit() {
	}
	onGetisSignup(value){
		this.isclkSignup = value;
	}

}
