export interface ITransactions {
    id: string;
    title: string;
    description: string;
    amount: number;
    transactionType: string;
    createdAt: string
}

export interface IPageTransactionResponse {
    transactions: ITransactions[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
}
