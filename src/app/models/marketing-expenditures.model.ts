export class MarketingExpenditures {

    id: number
    referral_source_id: number //fk
    amount_spent: number
    applies_from: string
    applies_until:string
    total_spent: number;
    note: string

}
