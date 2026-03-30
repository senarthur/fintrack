import { ITransactions } from "./ITransactions";

export interface IGroupedTransactions {
    date: string,
    label: string,
    transactions: ITransactions[];
}