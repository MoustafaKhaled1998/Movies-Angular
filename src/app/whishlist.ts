import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistIds = signal<number[]>([]);

  get ids() {
    return this.wishlistIds();
  }

  toggle(id: number) {
    const current = this.wishlistIds();
    this.wishlistIds.set(
      current.includes(id) ? current.filter(x => x !== id) : [...current, id]
    );
  }

  isInWishlist(id: number): boolean {
    return this.wishlistIds().includes(id);
  }
}
