import { Products } from "./products";

export class ProductPageableResponse {
    content!: Products[];
    pageNumber!: number;
    lastPage!:boolean;
    pageSize!:number;
    totalElements!:number;
    totalPages!:number;
}
