import { Component, computed, inject, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { TransactionService } from '../../../transactions/services/transaction-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { Header } from '../../../../core/layout/header/header';
import { ITransactions } from '../../../transactions/models/ITransactions';
import { IGroupedTransactions } from '../../../transactions/models/IGroupedTransactions';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { Card } from '../../../../shared/components/card/card';

@Component({
  selector: 'app-dashboard-home',
  imports: [MatChipsModule, CurrencyPipe, Header, LoadingSpinner, Card],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})

export class DashboardHome {
  private transactionService = inject(TransactionService);
  
  readonly transactions = signal<ITransactions[]>([]);
  readonly page = signal(0);
  readonly totalElements = signal(0);
  readonly loading = signal(false);
  readonly balance = toSignal(this.transactionService.getBalance(), { initialValue: 0 });

  activeFilter = signal<'ALL' | 'REVENUES' | 'EXPENSES'>('ALL');

  constructor() {
    this.loadTransactions();
  }

  loadTransactions() {
    if (this.loading()) return;

    this.loading.set(true);
    this.transactionService.getAllTransactions(this.page()).subscribe({
      next: (res) => {
        this.transactions.update(current => [...current, ...res.transactions]);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  
  displayedTransactions = computed(() => {
    const transactions = this.transactions();
    const filter = this.activeFilter();

    if (filter === 'REVENUES') return transactions.filter(t => t.transactionType === 'REVENUE');
    if (filter === 'EXPENSES') return transactions.filter(t => t.transactionType === 'EXPENSE');

    return transactions;
  });

  groupedTransactions = computed(() => {
    const transactions = this.displayedTransactions();
    const groups = new Map<string, ITransactions[]>();

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const auxYesterday = new Date((now.getMonth() + 1).toString() + "/" + (now.getDate() - 1).toString() + "/" +  now.getFullYear().toString());

    const yesterday = auxYesterday.toISOString().split('T')[0];

    transactions.forEach(t => {
      const date = new Date(t.createdAt).toISOString().split('T')[0];
      const dateKey = date;

      if (!groups.has(dateKey)) {
        groups.set(dateKey, []);
      }
      groups.get(dateKey)?.push(t);
    });

    return Array.from(groups.entries()).map(([dateKey, list]) => {
      let label = dateKey;
      if (dateKey === today) label = "Hoje";
      else if (dateKey === yesterday) label = "Ontem";
      else label = new Date(dateKey).toLocaleDateString();

      return { date: dateKey, label, transactions: list } as IGroupedTransactions;
    })
  })

  onScroll($event: any) {
    const element = $event.target;
    const currentScroll = Math.ceil(element.scrollTop + element.clientHeight);
    const threshold = element.scrollHeight - 100; 
    
    if (currentScroll >= threshold) {
      if (this.transactions().length < this.totalElements() && !this.loading()) {
        this.page.update(current => current + 1);
        this.loadTransactions();
      }
    }
  }

  setFilter(filter: 'ALL' | 'REVENUES' | 'EXPENSES' | undefined) {
    const newFilter = filter || 'ALL';
    this.activeFilter.set(newFilter);
  }
}
