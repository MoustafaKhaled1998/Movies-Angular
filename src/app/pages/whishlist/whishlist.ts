import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../whishlist';
import { FetchApi } from '../../fetch-api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './whishlist.html',
  styleUrls: ['./whishlist.scss']
})
export class Whishlist {
  wishlistMovies = signal<any[]>([]);

  constructor(public wishlist: WishlistService, public tmdb: FetchApi) {
    effect(() => {
      const ids = this.wishlist.ids;
      if (ids.length === 0) {
        this.wishlistMovies.set([]);
        return;
      }

      Promise.all(ids.map(id => this.tmdb.getMovieDetails(id).toPromise()))
        .then(results => this.wishlistMovies.set(results))
        .catch(err => console.error('Failed to fetch wishlist movies', err));
    });
  }
}
