enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

// TODO: after exploring the player dao, I have found this should be a model instead.
export type BankHistory = {
  amount: number;
  transaction_type: TransactionType;
  created_at: Date;
};
