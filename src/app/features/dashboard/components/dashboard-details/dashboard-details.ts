import { Component, inject, input, OnInit, signal, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { TransactionService } from '../../../transactions/services/transaction-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransactions } from '../../../transactions/models/ITransactions';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-details',
  imports: [MatButtonModule, MatIconModule, CurrencyPipe],
  templateUrl: './dashboard-details.html',
  styleUrl: './dashboard-details.scss',
})
export class DashboardDetails implements OnInit {

  private transactionService = inject(TransactionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  titleDisabled = signal(true);
  descriptionDisabled = signal(true);
  amountDisabled = signal(true);

  textTitleButton = signal('Alterar título');
  descriptionButton = signal('Alterar descrição');
  amountButton = signal('Alterar valor');
  
  transaction = signal<ITransactions | null>(null);

  ngOnInit(): void {
     const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.transactionService.getTransactionById(id).subscribe({
          next: (data) => this.transaction.set(data),
          error: (err) => console.error('Error fetching transaction:', err)
        })
      }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  setTitle(title: string) {
      const currentTransaction = this.transaction();
      if (currentTransaction) {
        this.transaction.set({ ...currentTransaction, title });
      }
  }

  toggleTitleEdit(newTitle: string) {
    const currentTransaction = this.transaction();

    if(!currentTransaction || !currentTransaction.id) {
      console.error('Error: Transação não carregada ou sem ID');
      return;
    }

    if(this.titleDisabled()) {
      this.titleDisabled.set(false);
      this.textTitleButton.set("Salvar Título");
      return;
    }

    const updatedTransation = {...currentTransaction, title: newTitle};

    this.transactionService.updateTransaction(currentTransaction.id, updatedTransation).subscribe({
      next: (savedData) => {
        this.transaction.set(savedData);
        this.titleDisabled.set(true);
        this.textTitleButton.set("Alterar Título")
      },
      error: (err) => {
        console.log("Erro ao atualizar a transação: ", err)
      }
    })
  }

  toggleDescriptionEdit(newDescription: string) {
    const currentTransaction = this.transaction();

    if(!currentTransaction || !currentTransaction.id) {
      console.error('Error: Transação não carregada ou sem ID');
      return;
    }

    if(this.descriptionDisabled()) {
      this.descriptionDisabled.set(false)
      this.descriptionButton.set("Salvar Descrição");
      return;
    }

    const updatedTransation = {...currentTransaction, description: newDescription};

    this.transactionService.updateTransaction(currentTransaction.id, updatedTransation).subscribe({
      next: (savedData) => {
        this.transaction.set(savedData);
        this.descriptionDisabled.set(true);
        this.descriptionButton.set("Alterar descrição")
      },
      error: (err) => {
        console.log("Erro ao atualizar a transação: ", err)
      }
    })
  }
  
  editAmount(newAmount: string) {
    const currentTransaction = this.transaction();

    if(!currentTransaction || !currentTransaction.id) {
      console.error('Error: Transação não carregada ou sem ID');
      return;
    }

    if(this.amountDisabled()) {
      this.amountDisabled.set(false)
      this.amountButton.set("Salvar Novo Valor");
      return;
    }

    const amountNumber = Number(newAmount.replace(/[^0-9.-]+/g,""));
    console.log(newAmount);
    const updatedTransation = {...currentTransaction, amount: amountNumber};
    console.log("Valor atualizado: ", updatedTransation);

    this.transactionService.updateTransaction(currentTransaction.id, updatedTransation).subscribe({
      next: (savedData) => {
        this.transaction.set(savedData);
        this.amountDisabled.set(true);
        this.amountButton.set("Alterar Valor")
      },
      error: (err) => {
        console.log("Erro ao atualizar a transação: ", err)
      }
    })
  }
  
  deleteTransaction() {
    const currentTransaction = this.transaction();

    if(!currentTransaction || !currentTransaction.id) {
      console.error('Error: Transação não carregada ou sem ID');
      return;
    }

    this.transactionService.deleteTransaction(currentTransaction.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
        console.log("Transação deletada com sucesso");
      },
      error: (err) => {
        console.log("Erro ao deletar a transação: ", err)
      }
    })
  }

}
