export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class Transaction {
  _id: string;
  user: string;
  type: string;
  amount: number;
  date: Date;
  description: string;

  constructor(props: Transaction) {
    this._id = props._id;
    this.user = props.user;
    this.type = props.type;
    this.amount = props.amount;
    this.date = props.date;
    this.description = props.description;
  }
}
