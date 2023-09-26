import { ApplicationInitStatus } from '@angular/core';
import { Time } from '@angular/common';
import { CalendarEvent } from 'calendar-utils';
import { Customer } from './customer';

export class Calendars {
    id: number
    customer: any
    appointment_type: number
    appointment_for: number  //estimator/crew/user etc
    appointment_with: number;  
    appointment_with_obj:Customer; 
    project_for_appointment: number
    start_date: string
    start_time: string
    end_date: string
    end_time: string
    time_duration: number 
    display_text: string
    use_default: boolean // to readonly the field of display text
    appointment_details: string
    event: CalendarEvent
    event_data_type: CalendarEvent[] = []  //acts like an array
    manage_calendar_id: number;
    appointment_for_name : string;
    appointment_with_name
    duration : number;
    is_sub_project: boolean;
    sub_project_id: number;
    
    constructor()
    {
        this.appointment_with_obj = new Customer();
    }
}
