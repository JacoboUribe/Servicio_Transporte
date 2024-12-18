import {Role} from "./role.model"
export class User {
    _id?:String;
    name?:String;
    email:String;
    password:String;
    token?:String;
    role?:Role;
}
