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
export class AppComponent {
  movies: Movie[]
  searchResults$: Observable<Movie[]>

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor() {}
}
