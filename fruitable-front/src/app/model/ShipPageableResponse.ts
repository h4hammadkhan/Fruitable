import { Ship } from "./ship";

export class ShipPageableResponse {
    content!: Ship[];
    pageNumber!: number;
    lastPage!:boolean;
    pageSize!:number;
    totalElements!:number;
    totalPages!:number;
}
