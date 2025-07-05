import { FormsModule } from '@angular/forms';
import { FetchApi } from '../../fetch-api';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { WishlistService } from '../../whishlist';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule,
    CarouselModule, ButtonModule, TagModule, FormsModule
    , PaginatorModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies implements OnInit {
  first = 0;
  rows = 10;

  constructor(public tmdb: FetchApi, public wishlist: WishlistService) { }

  ngOnInit(): void {
    this.loadPage(1);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    const pageNumber = event.page + 1;
    this.loadPage(pageNumber);
  }

  loadPage(page: number) {
    this.tmdb.fetchMovies(page);
  }
}

