import { UserRoles } from './user-roles.model'

export class UserAdministration {

    id: number
    first_name: string
    last_name:string
    phone_no:number
    email: string
    username: string;
    phone_number:string
    roles: Array<UserRoles>
    passwords:Array<string>
    is_active: boolean;
    password: string
    role_name:string
    user_id: number;
    password_confirmation:string;
    ids:Array<number>;

    constructor()
    {
        this.roles = new Array<UserRoles>();
        this.passwords = new Array<string>();
        this.ids = new Array<number>();
    }
}
