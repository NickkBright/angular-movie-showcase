import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, MovieAdapter } from '../model/movie';
import { RequestToken, Session } from '../model/auth';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private apiKey: string = "f0a469bb5dfe84d51d49a038c7094a84";
    private apiUrl: string = "https://api.themoviedb.org/3/";
    private apiGetCall(url: string):Observable<Object> {
        return this.http
            .get(url)
    }

    private apiPostCall(url: string, body: any){
        return this.http
            .post(url, body)
            //catchError(error => throwError(error))
    }

    private apiDeleteCall(url: string, options: any) {
        return this.http
            .delete(url, options)
    }

    constructor(private http: HttpClient, private adapter: MovieAdapter){}

    getTrending(): Observable<Movie[]> {
        const url: string = `${this.apiUrl}trending/all/day?api_key=${this.apiKey}`;
        return this.apiGetCall(url).pipe(
            map((data: any) => data.results.map(item => this.adapter.adapt(item)))
        );
    }

    getMovie(id: number): Observable<Movie> {
        const url: string = `${this.apiUrl}movie/${id}?api_key=${this.apiKey}`;
        return this.apiGetCall(url).pipe(
            map((data: any) => this.adapter.adapt(data))
        );;
    }

    searchMovie(query: string) : Observable<Movie[]> {
        const url: string = `${this.apiUrl}search/movie/?api_key=${this.apiKey}&query=${query}`;
        return this.apiGetCall(url).pipe(
            map((data: any) => data.results.map(item => this.adapter.adapt(item)))
        );;
    }

    getRequestToken():Observable<RequestToken> {
        const url: string = `${this.apiUrl}authentication/token/new?api_key=${this.apiKey}`;
        return this.apiGetCall(url).pipe(
            map((response: any) => ({success: response.success, token: response.request_token}))
        );
    }

    createSession(token):Observable<Session> {
        const url: string = `${this.apiUrl}authentication/session/new?api_key=${this.apiKey}`;
        const body = ({"request_token" : token.token});
        return this.apiPostCall(url, body).pipe(
            map((response: any) => ({success: response.success, id: response.session_id}))
        );
    }

    deleteSession(sessionId):Observable<Session> {
        const url: string = `${this.apiUrl}authentication/session?api_key=${this.apiKey}`;
        const options = {
            headers: new HttpHeaders({
                'Content-Type':'application/json'
            }),
            body: {
                session_id: sessionId 
            } 
        }
        return this.apiDeleteCall(url, options).pipe(
            map((response: any) => ({success: response.success}))
        );
    }

}