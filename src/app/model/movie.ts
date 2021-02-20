import { Injectable } from "@angular/core";

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
    adapt(item: any):Movie {
        return new Movie(
            item.id, 
            item.media_type,
            item.title || item.name, 
            `https://image.tmdb.org/t/p/w500${item.poster_path}`, 
            item.overview, 
            item.vote_average, 
            item.release_date
        )
    }
}