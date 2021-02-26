import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Actor } from '../model/actor';
import { Movie } from '../model/movie';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  actors: Actor[];
  movieNotFound: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

  /**
   * Retrieving data from MovieResolver and calling ApiService to get movie/tv cast
   */
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data);
      if (data.resolvedMovie) {
        this.movie = data.resolvedMovie;
        this.apiService
          .getCast(this.movie.id, this.movie.type)
          .pipe(first())
          .subscribe((data) => {
            this.actors = data;
          });
      }
      if (data.resolvedMovie.error) {
        this.router.navigateByUrl('404', { skipLocationChange: true });
      }
    });
  }
}
