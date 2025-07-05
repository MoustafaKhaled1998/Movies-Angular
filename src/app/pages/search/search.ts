import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FetchApi } from '../../fetch-api';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TagModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search implements OnInit {
  
  private route = inject(ActivatedRoute);
  private api = inject(FetchApi);
  

  query = signal('');
  results = signal<any[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.api.fetchGenres();
    this.route.queryParams.subscribe((params) => {
      const searchQuery = params['query'];
      if (searchQuery) {
        this.query.set(searchQuery);
        this.fetchSearchResults(searchQuery);
      }
    });
  }

  fetchSearchResults(query: string) {
    this.loading.set(true);
    this.api.searchMovies(query).subscribe({
      next: (res) => {
        this.results.set(res.results || []);
        this.loading.set(false);
      },
      error: () => {
        this.results.set([]);
        this.loading.set(false);
      }
    });
  }

  getImageUrl = this.api.getImageUrl;
getGenreName = this.api.getGenreName.bind(this.api);}
