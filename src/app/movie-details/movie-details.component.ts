import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';
import { Movie } from '../model/movie';
import { ApiService } from '../services/api-service';
import { MovieDataService } from '../services/movie-data-service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  id: number;
  movie: Movie;
  movieDataSubscription: Subscription;
  movieNotFound: boolean = false;

  constructor(
    private route:ActivatedRoute, 
    private movieData:MovieDataService,
    private apiService: ApiService) {
    this.route.params.subscribe(params => this.id = +params['id']);
  }

  ngOnInit(): void {
    this.movieDataSubscription = this.movieData.currentData.subscribe(movie => {
      if (movie.id) {
        this.movie = movie
      }
      else {
        this.apiService.getMovie(this.id).subscribe(
          data => this.movie = data,
          (error) => {
            console.error(error)
            this.movieNotFound = !error.ok
            console.log(this.movieNotFound)
          }
        );
      }
    })
  }
}
