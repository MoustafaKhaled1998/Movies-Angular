import { Component, computed } from '@angular/core';
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
  wishlistMovies = computed(() =>
    this.tmdb.movies().filter(movie => this.wishlist.ids.includes(movie.id))
  );

  constructor(
    public wishlist: WishlistService,
    public tmdb: FetchApi
  ) {}
}
