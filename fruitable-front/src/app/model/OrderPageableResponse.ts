import { Products } from "./products";
import { UsersOrder } from "./UsersOrder";

export class OrderPageableResponse {
    content!: UsersOrder[];
    pageNumber!: number;
    lastPage!:boolean;
    pageSize!:number;
    totalElements!:number;
    totalPages!:number;
}
