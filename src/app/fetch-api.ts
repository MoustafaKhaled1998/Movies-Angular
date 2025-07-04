// src/app/tmdb.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FetchApi {
  private http = inject(HttpClient);

  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM'; // Replace with your TMDB v4 Bearer token

  movies = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  totalPages = signal(1);
  currentPage = signal(1);
  searchQuery = signal('');

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.bearerToken}`
  });

  private endpoint = computed(() => {
    const query = this.searchQuery().trim();
    const page = this.currentPage();
    if (query) {
      return `${this.baseUrl}/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
    } else {
      return `${this.baseUrl}/trending/movie/week?page=${page}`;
    }
  });

// tmdb.service.ts
fetchMovies(page: number = 1) {
  this.loading.set(true);
  this.error.set(null);

  this.http
    .get<any>(`${this.baseUrl}/trending/movie/week?page=${page}`, {
      headers: this.headers,
    })
    .subscribe({
      next: (res) => {
        this.movies.set(res.results);
        this.totalPages.set(res.total_pages);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to fetch movies');
        this.loading.set(false);
      },
    });
}
getImageUrl(path: string, size: string = 'w500'): string {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : 'assets/no-image.png';
}

  goToPage(page: number) {
    this.currentPage.set(page);
    this.fetchMovies();
  }

search(query: string) {
  const trimmedQuery = query.trim();
  this.searchQuery.set(trimmedQuery);
  this.currentPage.set(1);

  if (trimmedQuery === '') {
    this.movies.set([]);
    this.totalPages.set(1);
    return;
  }

  this.fetchMovies();
}
genresMap: Record<number, string> = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance',
  878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
};

getGenreName(id: number): string {
  return this.genresMap[id] || 'Unknown';
}
fetchMovieById(id: number) {
  return this.http.get<any>(`${this.baseUrl}/movie/${id}`, {
    headers: this.headers
  });
}

}
