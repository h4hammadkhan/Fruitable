import { Products } from "./products";
import { User } from "./user";

export class UsersOrder {
    usersOrderId!:number;
	productQuantity!:number;
	subTotal!:number;
    date!:Date;
	sellerUserName!:string;
	active!:boolean;
	deliveryAddress!:string;
	city!:string;
	buyerFirstName!:string;
	buyerLastName!:string;
	buyerPhone!:string;
	buyerEmail!:string;
	buyerUserName!:string;
	product!:Products;
	user!:User;

}
