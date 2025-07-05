import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FetchApi } from '../../fetch-api';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { WishlistService } from '../../whishlist';

@Component({
  selector: 'app-tv-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TagModule,
    ButtonModule,
    CarouselModule
  ],
  templateUrl: './tv-detail.html',
  styleUrl: './tv-detail.scss',
})
export class TvDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdb = inject(FetchApi);
  wishlist = inject(WishlistService);

  tv = signal<any>(null);
  recommended = signal<any[]>([]);
  reviews = signal<any[]>([]); 

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = Number(paramMap.get('id'));
      if (id && !isNaN(id)) {
        this.tmdb.getTvDetails(id).subscribe((data) => {
          this.tv.set(data);
        });

        this.tmdb.getTvRecommendations(id).subscribe((res) => {
          this.recommended.set(res.results);
        });

        this.tmdb.getTvReviews(id).subscribe((res) => {
          this.reviews.set(res.results);
        });
      }
    });
  }

  getImageUrl = this.tmdb.getImageUrl;

  getGenreNames = computed(() =>
    this.tv()?.genres?.map((g: any) => g.name) ?? []
  );
}
