import { Report } from "./report";

export class ReportPageableResponse {
    content!: Report[];
    pageNumber!: number;
    lastPage!:boolean;
    pageSize!:number;
    totalElements!:number;
    totalPages!:number;
}
