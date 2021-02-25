import { Injectable } from "@angular/core";

export class Actor {
    constructor(
        public id: number = null,
        public name: string = '',
        public character: string = '',
        public picture: string = ''
    ){}
}

@Injectable({
    providedIn: 'root'
})

export class ActorAdapter {
    adapt(item: any): Actor {
        return new Actor(
            item.id,
            item.name,
            item.character,
            `https://image.tmdb.org/t/p/w500${item.profile_path}`
        )
    }
}