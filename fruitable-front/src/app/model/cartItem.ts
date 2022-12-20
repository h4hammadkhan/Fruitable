import { Product } from "./product";

export class CartItem {
    id:number;
    title:string;
    image:string;
    price:number;
    description!:string;
    quantity:number;
    count:number;

    constructor(product:Product){
        this.id = product.id;
        this.title = product.title;
        this.image = product.image;
        this.price = product.price;
        this.description = product.description;
        this.count = product.rating.count;
        this.quantity = 1;
    }

}
