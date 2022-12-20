import { CartItem } from './cartItem';
import { Product } from './product';

export class UserOrder {
  id!:number;
  firstname!:string;
  lastname!:string;
  email!:string;
  phone!:number;
  deliveryAddress!:string;
  dateTime!:string;
  subTotal!: number;
  totalQty!:number;
  cartItem!: CartItem[];

}
