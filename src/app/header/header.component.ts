import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchTerm: string = '';

  constructor(private router: Router) {}

  onSearch() {
    if (this.searchTerm) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchTerm } });
    }
  }

  closeMenu() {
    // Tutup burger menu
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }

    // Scroll ke bagian atas halaman
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}