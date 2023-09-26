import { Project } from './project';

export class CustomerInteractions {
    id: number
    customer_projects:Array<Project>;
    customer_id: number
    interaction_type: string
    interaction_notes: string
    performed_by_id: number
    performed_by: string
    created_at: string
}
