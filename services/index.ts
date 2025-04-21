import request from "../utils/request";

type TransactionProps = {
  id: string;
  createdAt: string;
  amount: string;
  desc: string;
  type: "credit" | "debit";
};

export type TransactionDetailsProps = {
  id: string;
  createdAt: string;
  amount: string;
  desc: string;
  type: "credit" | "debit";
  method: string;
  ref: string;
  status: "Successful" | "Failed" | "Pending";
};

const getTransactions = (): Promise<TransactionProps[]> => {
  const transactions: TransactionProps[] = [
    {
      id: "d538a30a-0ff5-46f1-a850-fc7d1a91e735",
      createdAt: "2025-02-09 18:36:15",
      amount: "12.77",
      desc: "Utilities",
      type: "credit",
    },
    {
      id: "51ac1a1e-2ed5-42d5-86c7-b0d1d0f0b4d5",
      createdAt: "2025-02-27 04:47:59",
      amount: "422.38",
      desc: "Dining out",
      type: "debit",
    },
    {
      id: "04b5c801-0fc9-42c7-b58b-5e59e1748f3c",
      createdAt: "2025-03-22 17:42:51",
      amount: "433.97",
      desc: "Refund",
      type: "debit",
    },
    {
      id: "f23a1d64-2638-4eb6-94f3-fb76038e6464",
      createdAt: "2025-03-20 00:32:31",
      amount: "167.77",
      desc: "Groceries",
      type: "credit",
    },
    {
      id: "e2544a56-1a03-45a4-a3c4-7c7c47964f49",
      createdAt: "2025-03-12 08:55:13",
      amount: "478.00",
      desc: "Refund",
      type: "credit",
    },
    {
      id: "0b342c25-79a0-4c0d-9a62-ef4781f6233c",
      createdAt: "2025-03-17 13:33:04",
      amount: "66.92",
      desc: "Gift",
      type: "credit",
    },
    {
      id: "1a7de1b1-15f4-4a14-956e-d735b05a3f0e",
      createdAt: "2025-02-12 18:39:47",
      amount: "21.36",
      desc: "Freelance work",
      type: "credit",
    },
    {
      id: "c8fc2026-3813-4b1f-a30f-80c1e781ea9c",
      createdAt: "2025-03-14 00:07:44",
      amount: "294.38",
      desc: "Shopping",
      type: "credit",
    },
    {
      id: "05ec2732-d5d9-4e40-9796-7d6ffb2d0e71",
      createdAt: "2025-03-06 00:43:45",
      amount: "464.89",
      desc: "Freelance work",
      type: "credit",
    },
    {
      id: "1f8c7313-c3b4-45aa-bcf3-cfc9e6b2b81c",
      createdAt: "2025-03-13 00:32:36",
      amount: "395.80",
      desc: "Refund",
      type: "debit",
    },
    {
      id: "4e8a6e79-6e59-4b1c-a187-3b01577e6e65",
      createdAt: "2025-01-22 13:57:15",
      amount: "11.65",
      desc: "Utilities",
      type: "credit",
    },
    {
      id: "1742ed9a-2879-4c33-b858-e437f55398b2",
      createdAt: "2025-01-07 15:12:06",
      amount: "39.61",
      desc: "Dining out",
      type: "credit",
    },
    {
      id: "50388a4f-bb34-432c-9ad5-00fa4bcbe32a",
      createdAt: "2025-02-12 01:06:10",
      amount: "212.83",
      desc: "Investment",
      type: "credit",
    },
    {
      id: "65e4e225-6491-4b2e-80a6-0a6f36f31d94",
      createdAt: "2025-03-17 01:06:03",
      amount: "115.78",
      desc: "Subscription",
      type: "credit",
    },
    {
      id: "d957fbb7-10ee-41bb-96a0-96a5929d6909",
      createdAt: "2025-02-25 13:58:38",
      amount: "249.18",
      desc: "Travel",
      type: "credit",
    },
    {
      id: "330f26d8-3bcb-40d2-a665-dc6ed0f40e78",
      createdAt: "2025-02-08 18:28:42",
      amount: "447.55",
      desc: "Freelance work",
      type: "debit",
    },
    {
      id: "16791662-56a6-468c-88a6-78aa58ee1082",
      createdAt: "2025-03-31 06:53:08",
      amount: "152.61",
      desc: "Bonus",
      type: "debit",
    },
    {
      id: "987d49e4-321f-4aa0-9a66-2f0a3c6dcd9e",
      createdAt: "2025-01-21 17:31:57",
      amount: "140.29",
      desc: "Refund",
      type: "debit",
    },
    {
      id: "f087baeb-2cf6-4f11-b4f3-c5391aa61b64",
      createdAt: "2025-03-06 14:25:48",
      amount: "74.60",
      desc: "Cashback",
      type: "credit",
    },
    {
      id: "d6b4f5fa-5b10-4c79-88ae-7190baf99f9c",
      createdAt: "2025-03-01 21:28:00",
      amount: "428.91",
      desc: "Travel",
      type: "debit",
    },
  ];
  // return await request.get(`/api/member/transaction`, payload);
  return Promise.resolve(transactions);
};

const getTransactionById = (id: string): Promise<TransactionDetailsProps> => {
  const transactionMap: Record<string, TransactionDetailsProps> = {
    "d538a30a-0ff5-46f1-a850-fc7d1a91e735": {
      id: "d538a30a-0ff5-46f1-a850-fc7d1a91e735",
      createdAt: "2025-02-09 18:36:15",
      amount: "12.77",
      desc: "Utilities",
      type: "credit",
      method: "E-Wallet",
      ref: "TRX224520",
      status: "Pending",
    },
    "51ac1a1e-2ed5-42d5-86c7-b0d1d0f0b4d5": {
      id: "51ac1a1e-2ed5-42d5-86c7-b0d1d0f0b4d5",
      createdAt: "2025-02-27 04:47:59",
      amount: "422.38",
      desc: "Dining out",
      type: "debit",
      method: "Bank Transfer",
      ref: "TRX905901",
      status: "Failed",
    },
    "04b5c801-0fc9-42c7-b58b-5e59e1748f3c": {
      id: "04b5c801-0fc9-42c7-b58b-5e59e1748f3c",
      createdAt: "2025-03-22 17:42:51",
      amount: "433.97",
      desc: "Refund",
      type: "debit",
      method: "Credit Card",
      ref: "TRX164551",
      status: "Pending",
    },
    "f23a1d64-2638-4eb6-94f3-fb76038e6464": {
      id: "f23a1d64-2638-4eb6-94f3-fb76038e6464",
      createdAt: "2025-03-20 00:32:31",
      amount: "167.77",
      desc: "Groceries",
      type: "credit",
      method: "E-Wallet",
      ref: "TRX918384",
      status: "Pending",
    },
    "e2544a56-1a03-45a4-a3c4-7c7c47964f49": {
      id: "e2544a56-1a03-45a4-a3c4-7c7c47964f49",
      createdAt: "2025-03-12 08:55:13",
      amount: "478.00",
      desc: "Refund",
      type: "credit",
      method: "FPX",
      ref: "TRX395358",
      status: "Pending",
    },
    "0b342c25-79a0-4c0d-9a62-ef4781f6233c": {
      id: "0b342c25-79a0-4c0d-9a62-ef4781f6233c",
      createdAt: "2025-03-17 13:33:04",
      amount: "66.92",
      desc: "Gift",
      type: "credit",
      method: "Bank Transfer",
      ref: "TRX769336",
      status: "Successful",
    },
    "1a7de1b1-15f4-4a14-956e-d735b05a3f0e": {
      id: "1a7de1b1-15f4-4a14-956e-d735b05a3f0e",
      createdAt: "2025-02-12 18:39:47",
      amount: "21.36",
      desc: "Freelance work",
      type: "credit",
      method: "FPX",
      ref: "TRX890412",
      status: "Successful",
    },
    "c8fc2026-3813-4b1f-a30f-80c1e781ea9c": {
      id: "c8fc2026-3813-4b1f-a30f-80c1e781ea9c",
      createdAt: "2025-03-14 00:07:44",
      amount: "294.38",
      desc: "Shopping",
      type: "credit",
      method: "Credit Card",
      ref: "TRX237412",
      status: "Failed",
    },
    "05ec2732-d5d9-4e40-9796-7d6ffb2d0e71": {
      id: "05ec2732-d5d9-4e40-9796-7d6ffb2d0e71",
      createdAt: "2025-03-06 00:43:45",
      amount: "464.89",
      desc: "Freelance work",
      type: "credit",
      method: "Bank Transfer",
      ref: "TRX442210",
      status: "Successful",
    },
    "1f8c7313-c3b4-45aa-bcf3-cfc9e6b2b81c": {
      id: "1f8c7313-c3b4-45aa-bcf3-cfc9e6b2b81c",
      createdAt: "2025-03-13 00:32:36",
      amount: "395.80",
      desc: "Refund",
      type: "debit",
      method: "FPX",
      ref: "TRX100294",
      status: "Successful",
    },
    "4e8a6e79-6e59-4b1c-a187-3b01577e6e65": {
      id: "4e8a6e79-6e59-4b1c-a187-3b01577e6e65",
      createdAt: "2025-01-22 13:57:15",
      amount: "11.65",
      desc: "Utilities",
      type: "credit",
      method: "Bank Transfer",
      ref: "TRX734567",
      status: "Successful",
    },
    "1742ed9a-2879-4c33-b858-e437f55398b2": {
      id: "1742ed9a-2879-4c33-b858-e437f55398b2",
      createdAt: "2025-01-07 15:12:06",
      amount: "39.61",
      desc: "Dining out",
      type: "credit",
      method: "Credit Card",
      ref: "TRX120984",
      status: "Pending",
    },
    "50388a4f-bb34-432c-9ad5-00fa4bcbe32a": {
      id: "50388a4f-bb34-432c-9ad5-00fa4bcbe32a",
      createdAt: "2025-02-12 01:06:10",
      amount: "212.83",
      desc: "Investment",
      type: "credit",
      method: "FPX",
      ref: "TRX566601",
      status: "Successful",
    },
    "65e4e225-6491-4b2e-80a6-0a6f36f31d94": {
      id: "65e4e225-6491-4b2e-80a6-0a6f36f31d94",
      createdAt: "2025-03-17 01:06:03",
      amount: "115.78",
      desc: "Subscription",
      type: "credit",
      method: "Credit Card",
      ref: "TRX883209",
      status: "Successful",
    },
    "d957fbb7-10ee-41bb-96a0-96a5929d6909": {
      id: "d957fbb7-10ee-41bb-96a0-96a5929d6909",
      createdAt: "2025-02-25 13:58:38",
      amount: "249.18",
      desc: "Travel",
      type: "credit",
      method: "E-Wallet",
      ref: "TRX439208",
      status: "Pending",
    },
    "330f26d8-3bcb-40d2-a665-dc6ed0f40e78": {
      id: "330f26d8-3bcb-40d2-a665-dc6ed0f40e78",
      createdAt: "2025-02-08 18:28:42",
      amount: "447.55",
      desc: "Freelance work",
      type: "debit",
      method: "Bank Transfer",
      ref: "TRX301923",
      status: "Successful",
    },
    "16791662-56a6-468c-88a6-78aa58ee1082": {
      id: "16791662-56a6-468c-88a6-78aa58ee1082",
      createdAt: "2025-03-31 06:53:08",
      amount: "152.61",
      desc: "Bonus",
      type: "debit",
      method: "FPX",
      ref: "TRX583219",
      status: "Pending",
    },
    "987d49e4-321f-4aa0-9a66-2f0a3c6dcd9e": {
      id: "987d49e4-321f-4aa0-9a66-2f0a3c6dcd9e",
      createdAt: "2025-01-21 17:31:57",
      amount: "140.29",
      desc: "Refund",
      type: "debit",
      method: "Bank Transfer",
      ref: "TRX112398",
      status: "Failed",
    },
    "f087baeb-2cf6-4f11-b4f3-c5391aa61b64": {
      id: "f087baeb-2cf6-4f11-b4f3-c5391aa61b64",
      createdAt: "2025-03-06 14:25:48",
      amount: "74.60",
      desc: "Cashback",
      type: "credit",
      method: "E-Wallet",
      ref: "TRX394820",
      status: "Successful",
    },
    "d6b4f5fa-5b10-4c79-88ae-7190baf99f9c": {
      id: "d6b4f5fa-5b10-4c79-88ae-7190baf99f9c",
      createdAt: "2025-03-01 21:28:00",
      amount: "428.91",
      desc: "Travel",
      type: "debit",
      method: "Credit Card",
      ref: "TRX732901",
      status: "Successful",
    },
  };

  return Promise.resolve(transactionMap[id]);
};

export { getTransactions, getTransactionById };
