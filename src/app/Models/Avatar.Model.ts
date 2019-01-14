export class Avatar{
	public id : number;
	public image : string;
	public iduser : number;

	constructor(id ?: number , iduser ?: number,image ?: string){
		this.id = id ;
		this.image = image;
		this.iduser = iduser;
	}
}