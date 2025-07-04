import { Routes } from '@angular/router';
import { Movies } from './pages/movies/movies';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { Tv } from './pages/tv/tv';
import { TvDetail } from './pages/tv-detail/tv-detail';
import { Whishlist } from './pages/whishlist/whishlist';
import { Search } from './pages/search/search';

export const routes: Routes = [
    { path: '', component: Movies, pathMatch: 'full' },
    { path: 'movies', component: Movies, pathMatch: 'full' },
    { path: 'moviesDetails/:id', component: MovieDetail, pathMatch: 'full' },
    { path: 'tv', component: Tv, pathMatch: 'full' },
    { path: 'tvDetails/:id', component: TvDetail, pathMatch: 'full' },
    { path: 'whishlist', component: Whishlist, pathMatch: 'full' },
    { path: 'search', component: Search, pathMatch: 'full' },
];
