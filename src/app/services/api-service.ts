import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Movie, MovieAdapter } from '../model/movie';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private apiKey: string = "f0a469bb5dfe84d51d49a038c7094a84";
    private apiUrl: string = "https://api.themoviedb.org/3/";
    private apiCall(url: string) {
        return this.http
            .get(url)
            .pipe(
                map((data: any) => data.results ? 
                data.results.map(item => this.adapter.adapt(item)) : this.adapter.adapt(data))
            );
    }

    constructor(private http: HttpClient, private adapter: MovieAdapter){}

    getTrending(): Observable<Movie[]> {
        const url: string = `${this.apiUrl}trending/all/day?api_key=${this.apiKey}`;
        return this.apiCall(url);
        
    }

    getMovie(id: number): Observable<Movie> {
        const url: string = `${this.apiUrl}movie/${id}?api_key=${this.apiKey}`;
        return this.apiCall(url);
    }

    searchMovie(query: string) : Observable<Movie[]> {
        const url: string = `${this.apiUrl}search/movie/?api_key=${this.apiKey}&query=${query}`;
        return this.apiCall(url);
    }
}