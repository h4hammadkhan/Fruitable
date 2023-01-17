import { UsersOrder } from "./UsersOrder";

export class Ship {

    shipId!: number;
    shipDate!: Date;
    code!: string;
    sellerUserName!:string;
    active!:Boolean;
    usersOrder!: UsersOrder;

}
