import { Component, computed, inject, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { TransactionService } from '../../../transactions/services/transaction-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '@angular/common';
import { Header } from '../../../../core/layout/header/header';

@Component({
  selector: 'app-dashboard-home',
  imports: [MatChipsModule, RouterLink, CurrencyPipe, Header],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})

export class DashboardHome {
  private transactionService = inject(TransactionService);
  private readonly transactions = toSignal(this.transactionService.getAllTransactions(), { initialValue: [] });
  
  readonly balance = toSignal(this.transactionService.getBalance(), { initialValue: 0 });
  
  activeFilter = signal<'ALL' | 'REVENUES' | 'EXPENSES'>('ALL');

  displayedTransactions = computed(() => {
    const transactions = this.transactions();
    const filter = this.activeFilter();

    if (filter === 'REVENUES') return transactions.filter(t => t.transactionType === 'REVENUE');
    if (filter === 'EXPENSES') return transactions.filter(t => t.transactionType === 'EXPENSE');

    return transactions;
  });

  setFilter(filter: 'ALL' | 'REVENUES' | 'EXPENSES' | undefined) {
    const newFilter = filter || 'ALL';
    this.activeFilter.set(newFilter);
  }
}
