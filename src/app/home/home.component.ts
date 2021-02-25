import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MovieDataService } from '../services/movie-data.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movie[];
  pageCounter: number = 1;

  constructor(private apiService: ApiService, private router: Router, private movieData: MovieDataService) {
    this.movies = [];
  }

  /**
   * Infinite scroll implementation
   */

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let currentPosition = document.documentElement.scrollTop + document.documentElement.clientHeight;
    let dataAppendTrigger = document.documentElement.scrollHeight;
    if (currentPosition === dataAppendTrigger) {
      this.getMovies(++this.pageCounter);
    }
  }

  ngOnInit() {
    this.getMovies(this.pageCounter);
  }

  /**
   * Get popular movies list with usage of ApiService
   * @param {number} page Number of popular movies page
   */

  getMovies(page: number) {
    this.apiService
      .getPopularMovies(page)
      .pipe(first())
      .subscribe((movies: Movie[]) => {
        if (this.movies.length) {
          this.movies = this.movies.concat(movies);
        } else {
          this.movies = movies;
        }
      });
  }

  /**
   * Open movie details page
   * @param { number } id Movie ID
   */

  showCurrentMovieDetails(id: number) {
    const selectedMovie: Movie = this.movies.find((item) => item.id === id);
    this.movieData.changeData(selectedMovie);
    this.router.navigateByUrl(`movie/${id}`);
  }
}
