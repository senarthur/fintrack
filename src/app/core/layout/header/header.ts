import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TransactionService } from '../../../features/transactions/services/transaction-service';
import { AuthService } from '../../../features/auth/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [MatSidenavModule, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  
  user_name: string = '';

  ngOnInit(): void {
    this.user_name = localStorage.getItem('name') || "";      
  }

  navigateToAddTransaction() {
    this.router.navigate(['/add-transaction']);
  }

  logout() {
    this.authService.logout();
  }
}
