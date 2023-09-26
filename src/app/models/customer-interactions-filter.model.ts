import { Project } from './project';

export class CustomerInteractionsFilter {

    customer_id:number;
    is_show_notes:boolean
    is_show_projects:boolean
    is_show_appointments:boolean
    is_show_calls:boolean
    is_show_expenses:boolean
    is_show_payments:boolean
    pcurrent_date:string
    customer_projects:Array<Project>;

}
