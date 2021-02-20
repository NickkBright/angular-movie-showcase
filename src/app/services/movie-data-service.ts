import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Movie } from "../model/movie";

@Injectable({
    providedIn: 'root'
})
export class MovieDataService {
    private movieData = new BehaviorSubject(new Movie);
    currentData = this.movieData.asObservable();

    constructor() {}

    changeData(data: Movie) {
        this.movieData.next(data);
    }
}