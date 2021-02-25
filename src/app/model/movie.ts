import { Injectable } from "@angular/core";

export interface MovieResolved {
    movie?: Movie,
    error?: any
}

export class Movie {
    constructor(
        public id: number = null,
        public type: string = '',
        public title: string = '',
        public poster: string = '',
        public overview: string = '',
        public vote_average: number = null,
        public release_date: string = ''
    ){}
    
}   

@Injectable({
    providedIn: 'root'
})

export class MovieAdapter {
    adapt(item: any, type?: string):Movie {
        return new Movie(
            item.id, 
            item.media_type || type,
            item.title || item.name, 
            item.poster_path? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'assets/default-avatar.png', 
            item.overview, 
            item.vote_average, 
            item.release_date
        )
    }
}