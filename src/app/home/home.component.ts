import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: Movie[];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private movieData: MovieDataService) {
      this.movies = [];
   }

  ngOnInit()  {
    this.apiService.getTrending().subscribe((movies: any) => {
      console.log(movies);
      this.movies = movies;
    })
  }

  showCurrentMovieDetails(id: number) {
    const selectedMovie: Movie = this.movies.find(item => item.id === id);
    this.movieData.changeData(selectedMovie);
    this.router.navigateByUrl(`movie/${id}`);
  }

}
