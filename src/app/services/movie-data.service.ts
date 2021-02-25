import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
/**
 * Movie data service
 */
export class MovieDataService {
  private movieData = new BehaviorSubject<Movie>(new Movie());
  currentData = this.movieData.asObservable();

  constructor() {}

    /**
     *  Change movieData subject data
     * @param { Movie } data New value of movieData subject
     */

  changeData(data: Movie) {
    this.movieData.next(data);
  }
}
