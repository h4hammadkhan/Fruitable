import { Products } from "./products";

export class CartItem {

    productId:number;
    quantity:number;
    stock:number;
	productName:string;
	price:number;
	product_image:string;
	measure:string; // KGs or Dozens
	date:Date;
    sellerUserName:string;
	
	

    constructor(product:Products){
        this.productId = product.productId;
        this.stock = product.quantity;
        this.quantity = 1;
        this.productName = product.productName;
        this.price = product.price;
        this.product_image = product.product_image;
        this.measure = product.measure;
        this.date = product.date;
        this.sellerUserName = product.user.userName;
    }

}
