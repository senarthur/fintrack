import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatSidenavModule, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private router = inject(Router);

  navigateToAddTransaction() {
    this.router.navigate(['/add-transaction']);
  }
}
