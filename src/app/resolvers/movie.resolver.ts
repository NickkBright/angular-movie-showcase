import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Movie, MovieResolved } from '../model/movie';
import { Observable, of, Subscription } from "rxjs";
import { ApiService } from "../services/api.service";
import { catchError, map, take, takeUntil } from "rxjs/operators";
import { MovieDataService } from "../services/movie-data.service";

@Injectable({
    providedIn: 'root'
})

export class MovieResolver implements Resolve<any>{

    movie: Movie;
    movieDataSubscription: Subscription;

    constructor(
        private apiService: ApiService,
        private movieData: MovieDataService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> {
        const id = route.paramMap.get('id');

        this.movieDataSubscription = this.movieData.currentData.pipe(take(1))
            .subscribe(movie => {
                if (movie.id && movie.id === +id) {
                    this.movie = movie;
                }
            });
        if (this.movie) {
            return of(this.movie)
        }
        else {
            return this.apiService.getMovie(+id).pipe(
                catchError(error => {
                    console.error(error)
                    return of(error)
                })
            )
        }

    }
}