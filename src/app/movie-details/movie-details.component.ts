import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  movie: Movie;
  movieNotFound: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data);
      if (data.resolvedMovie) {
        this.movie = data.resolvedMovie
      }
      if (data.resolvedMovie.error) {
        this.router.navigateByUrl("404", { skipLocationChange: true });
      } 
    })
  }
}
