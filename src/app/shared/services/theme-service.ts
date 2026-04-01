import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal<boolean>(true);

  constructor() {
    this.loadTheme();
  }

  toggleTheme() {
    if (this.isDarkMode()) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  private setLightTheme() {
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
    this.isDarkMode.set(false);
  }

  private setDarkTheme() {
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
    this.isDarkMode.set(true);
  }

  loadTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }
}
