import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { RequestToken, Session } from '../model/auth';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Authentification service
 */
export class AuthService {
  private currentSessionSubject: BehaviorSubject<Session>;
  currentSession: Observable<Session>;

  constructor(private apiService: ApiService) {
    this.currentSessionSubject = new BehaviorSubject<Session>(JSON.parse(localStorage.getItem('currentSession')));
    this.currentSession = this.currentSessionSubject.asObservable();
  }

  public get currentSessionValue(): Session {
    return this.currentSessionSubject.value;
  }

  /**
   * Authentification
   */
  authenticate() {
    const token: Observable<RequestToken> = this.apiService.getRequestToken();
    token.pipe(first()).subscribe((response) => {
      window.location.href = `https://www.themoviedb.org/authenticate/${response.token}?redirect_to=http://localhost:4200`;
    });
  }
  /**
   * Login
   * @param { RequestToken } token Approved request token
   */
  login(token: RequestToken) {
    console.log(token);
    return this.apiService.createSession(token).pipe(
      map((session) => {
        localStorage.setItem('currentSession', JSON.stringify(session.id));
        this.currentSessionSubject.next(session);
      })
    );
  }

  logout() {
    const sessionId = JSON.parse(localStorage.getItem('currentSession'));
    this.apiService.deleteSession(sessionId);
    localStorage.removeItem('currentSession');
    this.currentSessionSubject.next(null);
  }
}
