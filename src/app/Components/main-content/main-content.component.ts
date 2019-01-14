import { Component, OnInit,Output,EventEmitter,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
//Service 
import { ImageControllerService } from './../Service/image-controller.service';
//Component
declare var $:any;
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit,OnDestroy {
  private sub : Subscription;
  imgUrl : any = [
  ];
  constructor(
    public router : Router,
    public imageService : ImageControllerService
    ) { }
  private clicksignup : boolean = false;

  ngOnInit() {
    this.getAllImage();
    var swiper = new Swiper('.swiper-container', {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  ngOnDestroy(){
    this.clicksignup = false;

  }
  
  btnSignup(){
    this.router.navigate(['/signup']);
  }
  getAllImage(){
    this.sub = this.imageService.getAllSlide().subscribe(data => {
      this.imgUrl = data;
    })
  }  
}
