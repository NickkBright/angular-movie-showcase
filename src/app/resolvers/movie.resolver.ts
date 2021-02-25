import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Movie } from '../model/movie';
import { Observable, of, Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError, first } from 'rxjs/operators';
import { MovieDataService } from '../services/movie-data.service';

@Injectable({
  providedIn: 'root',
})

/**
 * MovieData subject stored data check. In other case apiCall to get movie/tv data
 * Route params:
 * @param { number } id Id of movie/tv
 * @param { string } type Type of item (movie or tv)
 */

export class MovieResolver implements Resolve<any> {
  movie: Movie;
  movieDataSubscription: Subscription;

  constructor(private apiService: ApiService, private movieData: MovieDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> {
    const id = route.paramMap.get('id');
    const type = route.paramMap.get('type');

    this.movieDataSubscription = this.movieData.currentData.pipe(first()).subscribe((movie) => {
      if (movie.id && movie.id === +id) {
        this.movie = movie;
      }
    });
    if (this.movie) {
      return of(this.movie);
    } else {
      return this.apiService.getMovieDBItem(+id, type).pipe(
        catchError((error) => {
          console.error(error);
          return of(error);
        })
      );
    }
  }
}
