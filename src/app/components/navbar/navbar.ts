import { Component, computed, effect, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { WishlistService } from '../../whishlist';
import { FetchApi } from '../../fetch-api';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  imports: [    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    NgIf,
    NgFor,
    CommonModule,
    InputGroupModule,
    ButtonModule,
    InputGroupAddonModule,
    MenuModule,
    FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  items: MenuItem[] = [];

  // Live search state
  searchTerm = signal('');
  showSuggestions = signal(false);
  suggestions = signal<any[]>([]);

  private debounceTimer: any = null;

  constructor(
    public wishlist: WishlistService,
    public tmdb: FetchApi,
    private router: Router
  ) {
    effect(() => {
      const count = this.wishlist.ids.length;

      this.items = [
        { label: 'Movies', icon: 'pi pi-video', routerLink: '/movies' },
        { label: 'TV Shows', icon: 'pi pi-desktop', routerLink: '/tv' },
        {
          label: 'WhishList',
          icon: 'pi pi-heart',
          routerLink: '/whishlist',
          badge: `${count}`
        },
        {
          label: 'Language',
          icon: 'pi pi-globe',
          items: [{ label: 'en' }, { label: 'ar' }]
        }
      ];
    });
  }

  handleInput(value: string) {
    this.searchTerm.set(value);
    this.showSuggestions.set(!!value.trim());

    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      const query = this.searchTerm().trim();
      if (!query) {
        this.suggestions.set([]);
        return;
      }

      this.tmdb.searchMovies(query).subscribe({
        next: (res) => this.suggestions.set(res.results.slice(0, 5)),
        error: () => this.suggestions.set([])
      });
    }, 300);
  }

  onSearchClick() {
    const query = this.searchTerm().trim();
    if (query) {
      this.showSuggestions.set(false);
      this.router.navigate(['/search'], { queryParams: { query } });
    }
  }

  onSuggestionClick(title: string) {
    this.searchTerm.set(title);
    this.onSearchClick();
  }
}