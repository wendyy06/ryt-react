import request from "../utils/request";

type Transaction = {
  id: number;
  createdAt: string;
  amount: number;
  desc: string;
  type: "credit" | "debit";
};

const getTransaction = (): Promise<Transaction[]> => {
  const transactions: Transaction[] = [
    {
      id: 1,
      createdAt: "2024-10-01 09:44:35",
      amount: 100,
      desc: "Salary",
      type: "credit",
    },
    {
      id: 2,
      createdAt: "2024-11-20 11:23:35",
      amount: -50,
      desc: "Groceries",
      type: "debit",
    },
    {
      id: 3,
      createdAt: "2024-11-22 19:45:35",
      amount: 200,
      desc: "Freelance work",
      type: "credit",
    },
    {
      id: 4,
      createdAt: "2024-12-01 08:15:20",
      amount: -30,
      desc: "Utilities",
      type: "debit",
    },
    {
      id: 5,
      createdAt: "2024-12-15 21:35:35",
      amount: 150,
      desc: "Bonus",
      type: "credit",
    },
    {
      id: 6,
      createdAt: "2024-12-20 07:24:35",
      amount: -70,
      desc: "Dining out",
      type: "debit",
    },
    {
      id: 7,
      createdAt: "2024-12-25 18:10:35",
      amount: 300,
      desc: "Gift",
      type: "credit",
    },
    {
      id: 8,
      createdAt: "2024-12-30 14:50:35",
      amount: -100,
      desc: "Shopping",
      type: "debit",
    },
  ];
  // return await request.get(`/api/member/transaction`, payload);
  return Promise.resolve(transactions);
};

export { getTransaction };
