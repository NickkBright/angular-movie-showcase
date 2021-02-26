import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, MovieAdapter } from '../model/movie';
import { RequestToken, Session } from '../model/auth';
import { Actor, ActorAdapter } from '../model/actor';
import { movieDBTypes } from '../util/constants';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for TheMovieDB api calls
 */
export class ApiService {
  private apiKey: string = 'f0a469bb5dfe84d51d49a038c7094a84';
  private apiUrl: string = 'https://api.themoviedb.org/3/';
  /**
   *  HttpGet function
   * @param { string } url API endpoint
   */
  private apiGetCall(url: string): Observable<Object> {
    return this.http.get(url);
  }
  /**
   *  HttpPost function
   * @param { string } url API endpoint
   * @param { any } body Request body
   */
  private apiPostCall(url: string, body: any) {
    return this.http.post(url, body);
  }
  /**
   *  HttpDelete function
   * @param { string } url API endpoint
   * @param { any } options Request options
   */
  private apiDeleteCall(url: string, options: any) {
    return this.http.delete(url, options);
  }

  constructor(private http: HttpClient, private movieAdapter: MovieAdapter, private actorAdapter: ActorAdapter) {}

  /**
   * Get trending movies/tv
   * @returns { Observable<Movie[]> } Adapted movies/tv observable
   */

  getTrending(): Observable<Movie[]> {
    const url: string = `${this.apiUrl}trending/all/day?api_key=${this.apiKey}`;
    return this.apiGetCall(url).pipe(
      map((data: any) => data.results.map((item: any) => this.movieAdapter.adapt(item)))
    );
  }
  /**
   * Get popular movies
   * @param { number } page Page number
   * @returns { Observable<Movie[]> } Adapted movies observable
   */

  getPopularMovies(page: number): Observable<Movie[]> {
    const url: string = `${this.apiUrl}movie/popular?api_key=${this.apiKey}&page=${page}`;
    return this.apiGetCall(url).pipe(
      map((data: any) => data.results.map((item: any) => this.movieAdapter.adapt(item, movieDBTypes.movie)))
    );
  }

  /**
   * Get TheMovieDB item
   * @param { number } id Movie/Tv id
   * @param { string } type Item type (movie/tv)
   * @returns { Observable<Movie> } Adapted movie/tv observable
   */
  getMovieDBItem(id: number, type: string): Observable<Movie> {
    const url: string = `${this.apiUrl}${type}/${id}?api_key=${this.apiKey}`;
    return this.apiGetCall(url).pipe(map((data: any) => this.movieAdapter.adapt(data, type)));
  }
  /**
   * Get movie/tv cast
   * @param { number } id Movie/Tv id
   * @param { string } type Item type (movie/tv)
   * @returns { Observable<Actor[]> } Adapted cast observable
   */
  getCast(id: number, type: string): Observable<Actor[]> {
    const url: string = `${this.apiUrl}${type}/${id}/credits?api_key=${this.apiKey}`;
    return this.apiGetCall(url).pipe(
      map((data: any) =>
        data.cast
          .filter((item: any) => item.known_for_department === 'Acting')
          .map((item: any) => this.actorAdapter.adapt(item))
      )
    );
  }
  /**
   * Get TheMovieDB search results
   * @param { string } query Search query
   * @param { string } type Item type (movie/tv)
   * @returns { Observable<Movie> } Adapted movie/tv observable
   */
  searchMovieDB(query: string, type: string): Observable<Movie[]> {
    const url: string = `${this.apiUrl}search/${type}/?api_key=${this.apiKey}&query=${query}`;
    return this.apiGetCall(url).pipe(
      map((data: any) => data.results.map((item: any) => this.movieAdapter.adapt(item, type)))
    );
  }
  /**
   * Get request token
   * @returns { Observable<RequestToken> } Request token observable
   */
  getRequestToken(): Observable<RequestToken> {
    const url: string = `${this.apiUrl}authentication/token/new?api_key=${this.apiKey}`;
    return this.apiGetCall(url).pipe(
      map((response: any) => ({ success: response.success, token: response.request_token }))
    );
  }
  /**
   * Get TheMovieDB search results
   * @param { RequestToken } token Approved request token
   * @returns { Observable<Session> } Session observable
   */
  createSession(token: RequestToken): Observable<Session> {
    const url: string = `${this.apiUrl}authentication/session/new?api_key=${this.apiKey}`;
    const body = { request_token: token.token };
    return this.apiPostCall(url, body).pipe(
      map((response: any) => ({ success: response.success, id: response.session_id }))
    );
  }
  /**
   * Get TheMovieDB search results
   * @param { string } sessionId Id of current user session
   * @returns { Observable<Session> } Session observable
   */
  deleteSession(sessionId: string): Observable<Session> {
    const url: string = `${this.apiUrl}authentication/session?api_key=${this.apiKey}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        session_id: sessionId,
      },
    };
    return this.apiDeleteCall(url, options).pipe(map((response: any) => ({ success: response.success })));
  }
}
