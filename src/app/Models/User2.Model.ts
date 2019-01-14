export class User2{
	public id  : number;
	public fullname : string;
	public username : string;
	public password : string;
	public date : Date;
	public address : string;
	constructor( fullname ?: string, username ?: string, password ?: string, date ?: Date, address ?: string){
		this.fullname = fullname;
		this.username = username;
		this.password = password;
		this.date = date;
		this.address = address;
	}
}