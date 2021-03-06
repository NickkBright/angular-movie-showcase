import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Movie } from '../model/movie';
import { ApiService } from '../services/api.service';
import { MovieDataService } from '../services/movie-data.service';
import { movieDBTypes } from '../util/constants';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements AfterViewInit {
  movies: Movie[];
  inputSubscription: Subscription;
  searchInput = new FormControl('');

  constructor(private apiService: ApiService, private router: Router, private movieData: MovieDataService) {}

  ngAfterViewInit() {
    this.searchInit();
  }

  /**
   * Cleanup function. Called after movie/tv click.
   */
  cleanup(): void {
    this.movies = [];
    this.searchInput.setValue('');
    this.typeaheadUnsubscribe();
  }

  /**
   * Search function. Called on input value change
   */

  searchInit() {
    this.inputSubscription = this.searchInput.valueChanges
      .pipe(
        filter((text) => text.length > 2),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((search) => {
          const movieSearch = this.apiService.searchMovieDB(search, movieDBTypes.movie);
          const tvSearch = this.apiService.searchMovieDB(search, movieDBTypes.tv);
          return merge(movieSearch, tvSearch);
        }),
        map((data) => data.slice(0, 7))
      )
      .subscribe((data) => {
        this.movies = data;
      });
  }

  typeaheadUnsubscribe() {
    this.inputSubscription.unsubscribe();
  }
  /**
   * Show movie/tv details
   * @param { number }id Id of movie/tv
   * @param { string }type Type of item (movie or tv)
   */

  showCurrentMovieDetails(id: number, type: string) {
    const selectedMovie: Movie = this.movies.find((item) => item.id === id);
    this.movieData.changeData(selectedMovie);
    this.router.navigateByUrl(`${type}/${id}`);
    this.cleanup();
  }
}
