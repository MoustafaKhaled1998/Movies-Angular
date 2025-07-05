import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { FetchApi } from '../../fetch-api';
import { WishlistService } from '../../whishlist';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    FormsModule,
    PaginatorModule
  ],
  templateUrl: './tv.html',
  styleUrl: './tv.scss'
})
export class Tv implements OnInit {
  first = 0;
  rows = 10;

  constructor(public tmdb: FetchApi, public wishlist: WishlistService) {}

  ngOnInit(): void {
    this.tmdb.fetchGenres();
    this.loadPage(1);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    const pageNumber = event.page + 1;
    this.loadPage(pageNumber);
  }

  loadPage(page: number) {
    this.tmdb.fetchTvShows(page);
  }
}
