import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';	
//Model 
import { Image2 } from './../../Models/Image2.Model';
import { Avatar } from './../../Models/Avatar.Model';
import { Slide } from './../../Models/Slide.Model';
@Injectable({
	providedIn: 'root'
})
export class ImageControllerService {
	private API = "http://localhost:3000/images2";
	private APIavatar = "http://localhost:3000/avatars";
	private APISlide = "http://localhost:3000/slide";
	public sub: Subscription;
	constructor(
		private http : HttpClient
		) {}
	getImagesUser(iduser : number ) : Observable<Image2[]>{
		return this.http.get<Image2[]>(`${this.API}?iduser=${iduser}`);
	}		
	UpdateImage(imguser : Image2) : Observable<Image2>{
		return this.http.post<Image2>(this.API,imguser);
	}
	UpdateAvatar(imguser : Avatar ) : Observable<Avatar>{
		return this.http.post<Avatar>(this.APIavatar,imguser);
	}
	DeletedAvatarOld(iduser : number ) : Observable<Avatar>{
		let result : any = this.http.delete<Avatar>(`${this.APIavatar}?iduser=${iduser}`);
		return this.http.delete<Avatar>(`${this.APIavatar}/${result.id}`);
	}
	getAvatar(iduser : number) : Observable<Avatar>{
		return this.http.get<Avatar>(`${this.APIavatar}?iduser=${iduser}`);
	}
	getDetailCategory(catename : string) : Observable<Image2>{
		return this.http.get<Image2>(`${this.API}?category=${catename}`)
	}
	DeletedImage(id : number ) : Observable<Image2>{
		return this.http.delete<Image2>(`${this.API}/${id}`);
	}
	getAllImage() : Observable<Image2>{
		return this.http.get<Image2>(`${this.API}`);
	}
	getAllSlide() : Observable<Slide>{
		return this.http.get<Slide>(`${this.APISlide}`);
	}
	updateSlide(slide : Slide) : Observable<Slide>{
		return this.http.post<Slide>(`${this.APISlide}`,slide);
	}
	deletedSlide(id) : Observable<Slide>{
		return this.http.delete<Slide>(`${this.APISlide}/${id}`);
	}

}
