import { scheduled } from 'rxjs';

export class PhoneCall {
    id: number
    phone_call_id: number //primary key
    filter_id:number
    customer_detail_obj: any ;
    project_id: number   //2
    call_date: Date      //3 
    title: string        //4
    assigned_to: number  //5
    scheduled_by: number
    reason: string       //6
    created_by: number
    created_on: Date
    modified_by: number
    modified_on: Date
    phone_call_array: Array<any>;
    call_completion_status_id: number;
    call_notes: string;
    is_schedule_another_call: boolean;
    phone_number:string
    status:string;
    result:string;
      
    constructor()
    {
        // this.phone_call_array = new Array<any>();
        this.customer_detail_obj = new Object()
    }

}
