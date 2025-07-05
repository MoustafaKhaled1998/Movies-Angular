import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FetchApi {
  private baseUrl = 'https://api.themoviedb.org/3';
  private readonly bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM';

private httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${this.bearerToken}`
  })
};

  private movieList = signal<any[]>([]);
  private totalPages = signal(1);

  movies = this.movieList;
  totalPagesSignal = this.totalPages;

  constructor(private http: HttpClient) {}

// Fetch popular/trending movies by page
  fetchMovies(page = 1) {
    const params = new HttpParams()
      .set('language', 'en-US')
      .set('page', page.toString());

    this.http
      .get<{ results: any[]; total_pages: number }>(
        `${this.baseUrl}/movie/popular`,
        { ...this.httpOptions, params }
      )
      .subscribe((res) => {
        this.movieList.set(res.results);
        this.totalPages.set(res.total_pages);
      });
  }

  // Search movies by query
  searchMovies(query: string, page = 1, language = 'en-US') {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('language', language);

    return this.http.get<{ results: any[] }>(
      `${this.baseUrl}/search/movie`,
      { ...this.httpOptions, params }
    );
  }

  // movie details by ID
  getMovieDetails(id: number) {
    return this.http.get<any>(
      `${this.baseUrl}/movie/${id}`,
      this.httpOptions
    );
  }

  getImageUrl(path: string) {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : '';
  }

  //  genre name by ID 
  genreList = signal<Record<number, string>>({});

  fetchGenres() {
    this.http
      .get<{ genres: { id: number; name: string }[] }>(
        `${this.baseUrl}/genre/movie/list`,
        this.httpOptions
      )
      .subscribe((res) => {
        const genreMap: Record<number, string> = {};
        res.genres.forEach((g) => (genreMap[g.id] = g.name));
        this.genreList.set(genreMap);
      });
  }

  getGenreName(id: number): string {
    return this.genreList()[id] || 'Unknown';
  }

  getRecommendations(id: number) {
  return this.http.get<{ results: any[] }>(
    `${this.baseUrl}/movie/${id}/recommendations`,
    this.httpOptions
  );
}
getMovieReviews(id: number) {
  return this.http.get<{ results: any[] }>(
    `${this.baseUrl}/movie/${id}/reviews`,
    this.httpOptions
  );
}
}




