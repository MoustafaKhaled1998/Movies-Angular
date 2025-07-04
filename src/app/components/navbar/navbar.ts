import { Component, effect } from '@angular/core';
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
    MenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
    items: MenuItem[] = [];

  constructor(public wishlist: WishlistService) {
    effect(() => {
      const count = this.wishlist.ids.length;

      this.items = [
        { label: 'Movies', icon: 'pi pi-video', routerLink: '/movies' },
        { label: 'TV Shows', icon: 'pi pi-desktop', routerLink: '/tv' },
        {
          label: 'WhishList',
          icon: 'pi pi-heart',
          routerLink: '/whishlist',
          badge: count ? `${count}` : undefined
        },
        {
          label: 'Language',
          icon: 'pi pi-globe',
          items: [
            { label: 'en' },
            { label: 'ar'}
          ]
        }
      ];
    });
  }
}
