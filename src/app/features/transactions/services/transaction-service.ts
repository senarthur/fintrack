import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITransactions } from '../models/ITransactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/transactions';

  getAllTransactions() {
    return this.http.get<ITransactions[]>(this.apiUrl);
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
