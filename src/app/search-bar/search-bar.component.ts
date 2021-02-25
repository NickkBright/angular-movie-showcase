import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Movie } from '../model/movie';
import { ApiService } from '../services/api.service';
import { MovieDataService } from '../services/movie-data.service';
import { searchTypes } from '../util/constants';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit {
  movies: Movie[];
  inputSubscription: Subscription
  searchInput = new FormControl('');

  constructor(
    private apiService: ApiService,
    private router: Router,
    private movieData: MovieDataService) { }

  ngAfterViewInit() {
    this.searchInit();
  }

  cleanup(): void {
    this.movies = [];
    this.searchInput.setValue('');
    this.typeaheadUnsubscribe();
  }

  searchInit() {
    this.inputSubscription = this.searchInput.valueChanges
      .pipe(
        filter(text => text.length > 2),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => {
          const movieSearch = this.apiService.searchMovieDB(search, searchTypes.movie);
          const tvSearch = this.apiService.searchMovieDB(search, searchTypes.tv);
          return merge(movieSearch, tvSearch);
        }),
        map(data => data.slice(0, 7))
      ).subscribe(
        data => {
          this.movies = data
        }
      )
  }

  typeaheadUnsubscribe() {
    this.inputSubscription.unsubscribe();
    console.log(this.inputSubscription);
  }

  showCurrentMovieDetails(id: number) {
    const selectedMovie: Movie = this.movies.find(item => item.id === id);
    console.log(selectedMovie);
    this.movieData.changeData(selectedMovie);
    this.router.navigateByUrl(`movie/${id}`);
    this.cleanup();
  }
}
