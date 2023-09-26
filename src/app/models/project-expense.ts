export class ProjectExpense {
    id: number;
    projectExpenseId: number;
    projectId: number;
    expenseTypeId: number;
    payToTypeId: number;
    description: string;
    notes: string;
    expenseDate: Date;
    paidDate: Date;
    statusId: number;
    orderedBy: number;
    createdBy: number;
    createdOn: Date;
    modifiedBy: number;
    modifiedOn: Date;
    isDeleted: boolean;

}
