import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';

import { TransactionService } from "../../../transactions/services/transaction-service"

@Component({
  selector: 'app-dashboard-add-form',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './dashboard-add-form.html',
  styleUrl: './dashboard-add-form.scss',
})
export class DashboardAddForm {
  private _formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private transactionService = inject(TransactionService);
  private _snackBar = inject(MatSnackBar);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });

  goBack() {
    this.router.navigate(['/']);
  }

  onSubmit(stepper: MatStepperModule) {
    if(this.firstFormGroup.invalid || this.secondFormGroup.invalid ||
      this.thirdFormGroup.invalid || this.fourthFormGroup.invalid) {
        this._snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar')
        return;
      }
      
      const transactionType = this.fourthFormGroup.value.fourthCtrl == "EXPENSE" ? 1 : 0;
      
      const newTransaction = {
      amount: Number(this.firstFormGroup.value.firstCtrl), 
      title: this.secondFormGroup.value.secondCtrl,
      description: this.thirdFormGroup.value.thirdCtrl,
      transactionType: transactionType
    };

    this.transactionService.createTransaction(newTransaction as any).subscribe({
      next: (response) => {
        console.log('Transação salva com sucesso', response);
        this.router.navigate(['/']); 
      },
      error: (error) => {
        console.error('Erro ao salvar transação', error);
      }
    });
  }
}
