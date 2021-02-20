import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';
import { Movie } from '../model/movie';
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

  constructor(private route:ActivatedRoute, private movieData:MovieDataService) {
    this.route.params.subscribe(params => this.id = +params['id']);
  }

  ngOnInit(): void {
    this.movieDataSubscription = this.movieData.currentData.subscribe(movie => this.movie = movie)
  }

}
