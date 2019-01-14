export class Image{
	public id : number;
	public image : any;
	public iduser : number;
	public category : string;
	public fullname : string;
	public avatar : string;

	constructor(id ?: number , iduser ?: number,image ?: any[], category ?: string, fullname ?: string , avatar ?: string){
		this.id = id ;
		this.image = image;
		this.iduser = iduser;
		this.category = category;
		this.fullname = fullname;
		this.avatar = avatar;
	}
}