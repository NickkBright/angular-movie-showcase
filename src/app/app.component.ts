import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userIsLoggedIn: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.currentSession.subscribe(session => {
      console.log("SESSION", session);
      if(session) {
        this.userIsLoggedIn = true
      }
      else {
        this.userIsLoggedIn = false;
      }
    })
  }

  authenticate() {
    this.authService.authenticate();
  }
  
  logout() {
    this.authService.logout();
  }
}
