export class Image2{
	public id : number;
	public image : any;
	public iduser : number;
	public category : string;
	public fullname : string;
	public avatar : string;
	public nameimg: string;

	constructor(id ?: number , iduser ?: number,image ?: any, category ?: string, fullname ?: string , avatar ?: string,nameimg ?: string){
		this.id = id ;
		this.image = image;
		this.iduser = iduser;
		this.category = category;
		this.fullname = fullname;
		this.avatar = avatar;
		this.nameimg = nameimg;
	}
}