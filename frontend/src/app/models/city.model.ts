import { Address } from "./address.model";

export class City {
    id?:number;
    zip_code:string
    city_name:string;
    department_id:string;
    addresses?:Address[];
}
