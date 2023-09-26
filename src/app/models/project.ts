import { ProjectAttachments } from "./ProjectAttachments";

export class Project {
  id: number;
  project_number: number;
  customer_id: number;
  customer_name: string;
  is_customer_address: number = 1;
  address_1: string;
  address_2: string;
  city_id: number;
  city_name: string;
  state_id: number;
  zip_code: string;
  sub_division_name: string;
  major_intersection: string;
  project_type_id: number = 1;
  project_description: string;
  internal_notes: string;
  nick_names: string;
  status_id: number = 1;
  potential_type_id: number = 20;
  supervisor_id: number;
  estimator_id: number;
  estimator_work_start_date: Date;
  crew_id: number;
  crew_work_start_date: Date;
  crew_work_end_date: Date;
  start_date: Date;
  end_date: Date;
  location_map_url: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  sub_project_id: number;
  is_sub_project: boolean;
  attachments: Array<ProjectAttachments>;

  constructor() {
    this.attachments = new Array<ProjectAttachments>();
  }
}
