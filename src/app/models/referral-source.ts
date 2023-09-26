export class ReferralSource {
  id: number;
  name: string;
  referral_source_id:number;
  referral_source: string;
  total_spent: number;
  amount_spent: number;
  applies_from: string;
  applies_until: string;
  note: string;
  is_active: boolean = true;
}
