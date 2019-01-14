import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
//Model
import { User } from './../../Models/user.model';
import { Admin } from './../../Models/Admin.Model';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	private API = "http://localhost:3000/users";
	private APIlogin = "http://localhost:3000/logins";
	private APIadmin = "http://localhost:3000/admins";
	public sub: Subscription;


	constructor(
		private http : HttpClient
		) { }
	getAllUser() : Observable<User[]>{
		return this.http.get<User[]>(this.API);
	}
	getUser(username : string) : Observable<User>{
		return this.http.get<User>(`${this.API}?username=${username}`);
	}
	getProfile(id) : Observable<User>{
		return this.http.get<User>(`${this.API}/${id}`);
	}
	OnSignUp(user) : Observable<User>{
		return this.http.post<User>(this.API,user);
	}
	HandleError(err){
		if(err.error instanceof Error){
			console.log(`Client-side Error : ${err.error.message}`);
		}else{
			console.log(`Client-side Error : ${err.status}`);
		}
	}
	UpdateProfile(user : User) : Observable<User>{
		return this.http.put<User>(`${this.API}/${user.id}`,user);
	}
	theFirstUpdate(user : User) : Observable<User>{
		return this.http.post<User>(`${this.API}`,user);
	}
	CheckAdmin(): Observable<Admin> {
		return  this.http.get<Admin>(`${this.APIadmin}`)
	}
	//Deleted
	DeletedUserAdmin(id : string) : Observable<User>{
		this.http.delete(`${this.APIlogin}/${id}`);
		return this.http.delete<User>(`${this.API}/${id}`);
	};
	DeletedLoginAdmin(id : string) : Observable<User>{
		return this.http.delete<User>(`${this.APIlogin}/${id}`);
	}
	AddAdmin(admin : Admin) : Observable<Admin>{
		return this.http.post<Admin>(`${this.APIadmin}`,admin);
	}
}
