import { Time } from "@angular/common";
import { DynamicProjectDetails } from "./dynamic-project-details";
import { OtherDescription } from "./other-description.model";
import { InteriorDescription } from "./interior-description.model";
import { InteriorPaints } from "./interior-paints.models";
import { ProjectAttachments } from "./ProjectAttachments";

export class ProjectDetails {
  id: number;
  project_id: number;
  sub_projects: number;
  payment_date: Date;
  payment_amount: number;
  payment_method: number;
  cheque_number: string;
  payment_collected_by: number;
  payment_notes: string;
  expense_type: number;
  pay_to: number;
  description: string;
  expense_notes: string;
  expense_date: Date;
  paid_date: Date;
  ordered_by: number;
  status: number;
  estimate_date: Date;
  estimate_time: Time;
  referred_by: string;

  estimate_description: string;
  estimate_description_amount: number;
  is_paint_material_included: boolean;
  estimate_subtotal: number;

  estimate_discount_value: number;

  deposit_amount: number;
  interior_deposit_amount: number;
  exterior_deposit_amount: number;

  discount_amount: number;

  discount_type: number;
  discount_payment_method: number;
  estimate_net_amount: number;
  special_notes: string;
  final_price: number;

  area: string;
  coat_1: number;
  coat1_gallons: number;
  coat_2: number;
  coat2_gallons: number;
  trim: number;
  trim_coats: number;
  trim_gallons: number;
  ceiling: number;
  ceiling_coats: number;
  ceiling_gallons: number;
  closet: number;
  price: number;
  is_fix_sheetrock: boolean;
  is_skim_sheetrock: boolean;
  is_strip_wallpaper: boolean;
  carpentery: boolean;
  carpentery_amount: number;
  price_subtotal: any;
  is_porter: boolean;
  is_duron: boolean;
  is_glidden: boolean;
  is_benjamin_moore: boolean;
  is_sherwin_williams: boolean;
  is_other_paint: boolean;
  ceilings: string;
  walls: string;
  trims: string;
  others: string;

  // same entries
  is_interior_paint_material_included: boolean;
  interior_discount_amount: number;
  interior_discount_type: number;
  interior_payment_method: number;
  interior_special_notes: string;
  interior_final_price: number;
  interior_subtotal: number;
  interior_discount_value: number;
  interior_net_amount: number;

  // exterior start
  is_house: boolean;
  is_gutters: boolean;
  is_decks: boolean;
  is_driveway: boolean;
  is_patio: boolean;
  is_fence: boolean;
  pressure_wash_notes: string;
  pressure_wash_price: number;
  is_scrape_prime: boolean;
  is_scrape_price: boolean;
  is_prime_window: boolean;
  is_putty: boolean;
  is_windows: boolean;
  is_sliding: boolean;
  is_ground_doors: boolean;
  is_cover_plant: boolean;
  is_doors: boolean;
  is_cornice: boolean;
  is_brick: boolean;
  is_metal: boolean;
  is_reglaze_windows: boolean;
  is_silicone_caulk_notes: boolean;
  recaulk: string;
  is_windows_price: boolean;

  is_stucco: boolean;
  is_stucco_brick: boolean;
  is_stucco_metal: boolean;
  is_concrete: boolean;
  is_bay_tops_notes: boolean;
  caulk: string;
  stucco_price: boolean;

  is_prime_siding: boolean;
  is_prime_trim: boolean;
  is_prime_windows: boolean;
  is_prime_new_wood: boolean;
  is_prime_brick: boolean;
  is_prime_metal: boolean;
  prime_coats: number;
  prime_gallons: number;
  prime_assignment: number;
  prime_notes: string;
  paint: string;
  notes: string;
  prime_price: number;

  siding_type: number;
  siding_assigned_to: number;
  siding_color: string;
  siding_paint: string;
  siding_coats: number;
  siding_gallons: number;
  siding_finish: number;
  siding_price: number;

  trim_type: number;
  trim_assigned_to: number;
  trim_color: string;
  trim_paint: string;
  trim_coat: number;
  trim_gallon: number;
  trim_finish: number;
  trim_price: number;

  shutter_type: number;
  shutter_assigned_to: number;
  shutter_color: string;
  shutter_paint: string;
  shutter_coats: number;
  shutter_gallons: number;
  shutter_finish: number;
  shutter_price: number;

  is_front_door_prime: boolean;
  is_front_door_paint: boolean;
  front_door_coats: number;
  front_door_gallons: number;
  front_door_notes: string;
  front_door_price: number;

  is_bay_tops_paint: boolean;
  is_bay_tops_copper: boolean;
  iron_railing_strip: boolean;
  iron_railing_prime: boolean;
  iron_railing_paint: boolean;
  iron_railing_notes: string;
  bay_tops_price: number;

  is_porch_outside: boolean;
  is_porch_inside: boolean;
  is_porch_ceiling: boolean;
  is_porch_cover: boolean;
  is_porch_floor: boolean;
  is_porch_seal: boolean;
  is_porch_stain: boolean;
  is_porch_paint: boolean;
  porch_price: number;

  is_decks_clean: boolean;
  is_decks_seal: boolean;
  is_decks_prime: boolean;
  is_decks_paint: boolean;
  is_decks_stain: boolean;

  decks_color: string;
  decks_coats: string;

  decks_assigned_to: number;
  decks_paint: number;
  decks_finish: number;
  decks_gallons: number;
  decks_price: number;

  is_seal_cracks: boolean;
  is_seal_around_trim: boolean;
  is_seal_dow_corning: boolean;
  seal_color: number;
  seal_coats: number;
  seal_price: number;

  is_elastromeric_paint: boolean;
  is_spray_black_roll: boolean;
  is_paint_stucco_trim: boolean;
  paint_coats: number;
  paint_gallons: number;
  paint_assigned_to: number;
  paint_color: string;
  paint_price: number;
  paint_finish: number;
  paint_notes: string;

  carpentry: string;
  carpentry_price: number;
  others_notes: string;
  other_price: number;

  is_price_include_paint_material: boolean;
  exterior_discount_type: number;
  exterior_discount_value: number;
  exterior_net_amount: number;
  exterior_discount_amount: number;
  exterior_payment_method: number;
  exterior_payment_amount: number;
  exterior_special_notes: string;
  exterior_price: number;

  attachments: Array<ProjectAttachments>;

  dynamicProjectsArray: Array<OtherDescription>;
  // interior
  dynamicPaintAreaArray: Array<InteriorPaints>;
  dynamicNotesAreaArray: Array<InteriorDescription>;

  constructor() {
    this.attachments = new Array<ProjectAttachments>();
  }
}
