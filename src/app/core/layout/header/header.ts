import { Component, computed, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth-service';
import { ThemeService } from '../../../shared/services/theme-service';

@Component({
  selector: 'app-header',
  imports: [MatSidenavModule, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private theme = inject(ThemeService);
  
  user_name: string = '';
  themeIcon = computed(() => this.theme.isDarkMode() ? 'sunny' : 'bedtime');

  ngOnInit(): void {
    this.user_name = localStorage.getItem('name') || "";      
  }

  navigateToAddTransaction() {
    this.router.navigate(['/add-transaction']);
  }

  logout() {
    this.authService.logout();
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }
}
