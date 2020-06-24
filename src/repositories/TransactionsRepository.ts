import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Response {
    // TODO
    const response: Response = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return response;
  }

  public getBalance(): Balance {
    // TODO
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((total, transaction) => total + transaction.value, 0);

    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((total, transaction) => total + transaction.value, 0);

    const total = income - outcome;

    const balance: Balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
