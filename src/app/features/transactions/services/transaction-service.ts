import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPageTransactionResponse, ITransactions } from '../models/ITransactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  private http = inject(HttpClient);
  private apiUrl = 'https://fintrack-z5n9.onrender.com/api/transactions';

  getAllTransactions(page: number = 0, size: number = 10) {
    return this.http.get<IPageTransactionResponse>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
 
  getTransactionById(id: string) {
    return this.http.get<ITransactions>(`${this.apiUrl}/${id}`);
  }

  getBalance() {
    return this.http.get<number>(`${this.apiUrl}/balance`);
  }

  createTransaction(transaction: ITransactions) {
    return this.http.post<ITransactions>(this.apiUrl, transaction);
  }

  deleteTransaction(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTransaction(id: string, transaction: ITransactions) {
    return this.http.put<ITransactions>(`${this.apiUrl}/${id}`, transaction);
  }
}
