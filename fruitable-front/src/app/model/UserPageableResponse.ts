import { User } from "./user";

export class UserPageableResponse {
    content!: User[];
    pageNumber!: number;
    lastPage!:boolean;
    pageSize!:number;
    totalElements!:number;
    totalPages!:number;
}
