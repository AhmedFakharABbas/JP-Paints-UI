export class CustomerPayments {
  id: number;
  project_id: number;

  // customerPaymentId: number;

  payment_amount: number;
  payment_method: number;
  payment_date: Date;
  cheque_number: string;

  // customerId: number;

  payment_collected_by: number;
  payment_collected_by_name: string;
  payment_notes: string;

  // modifiedBy: number;
  // createdBy: number;

  isDeleted: boolean;
}
