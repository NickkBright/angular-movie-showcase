import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, find, map, switchMap, take } from 'rxjs/operators';
import { Movie } from './model/movie';
import { ApiService } from './services/api-service';
import { MovieDataService } from './services/movie-data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  movies: Movie[]
  searchResults$: Observable<Movie[]>

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private movieData: MovieDataService) {}

  ngAfterViewInit() {
    this.searchResults$ = fromEvent<any>(this.searchInput.nativeElement, 'keyup')
        .pipe(
          map(event => event.target.value),
          filter(text => text.length > 2),
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(search => this.apiService.searchMovie(search)),
          map(data => data.slice(0, 7))
        )
    this.searchResults$.subscribe(
        data => this.movies = data
    )
  }

  cleanup() {
    this.movies = [];
    this.searchInput.nativeElement.value = '';
  }

  showCurrentMovieDetails(id: number) {
    const selectedMovie: Movie = this.movies.find(item => item.id === id);
    this.movieData.changeData(selectedMovie);
    this.router.navigateByUrl(`movie/${id}`);
    this.cleanup();
  }
}
