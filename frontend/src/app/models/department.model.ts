import { City } from "./city.model";

export class Department {
    id?:number;
    department_name:string;
    region:string;
    city?:City[];
}
