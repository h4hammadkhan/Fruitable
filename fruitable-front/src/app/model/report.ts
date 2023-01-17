import { User } from "./user";

export class Report {

    reportId!:number;
    spamOrMislead!:boolean;
    badQualityProducts!:boolean;
    others!:boolean;
    description!:string;
    buyerUserName!:string;
    user!:User;
}
