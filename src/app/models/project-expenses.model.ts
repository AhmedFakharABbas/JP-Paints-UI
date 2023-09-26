import { ExpenseItems } from "./expense-items.model";

export class ProjectExpenses {
  id: number;
  project_id: number;
  expense_type: number;
  description: string;
  expense_notes: string;
  expense_date: Date;
  paid_date: Date;
  ordered_by: number;
  status: number;
  pay_to: number;
  collected_by: number;
  collected_by_name: string;
  ordered_by_name: string;
  created_at: Date;
  modified_by: number;
  updated_at: Date;
  is_deleted: boolean;
  amount: number;
  expenseItemsArray: Array<ExpenseItems>;
}
