export class Products {

    productId!: number;
	productName!:string;
	quantity!: number;
	price!: number;
	product_image!:string;
	measure!:string; // KGs or Dozens
	date!:Date;
	productCategory!:{
    categoryId: number,
  };
	user!:{ 
    userId: number,
  };
}
