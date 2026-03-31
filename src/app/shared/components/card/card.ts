import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ITransactions } from '../../../features/transactions/models/ITransactions';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  @Input() transaction: ITransactions | null = null;
}
