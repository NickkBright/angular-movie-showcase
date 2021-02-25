import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { RequestToken } from '../model/auth';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Request token approval check then authService call for login.
 * Route params:
 * @param { string } approved Status of request token approval
 * @param { string } token Value of requested token
 */
export class AuthResolver implements Resolve<any> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token: RequestToken = { success: route.queryParams.approved, token: route.queryParams.request_token };
    if (token.success === 'true') {
      this.authService.login(token).pipe(first()).subscribe();
      this.router.navigateByUrl('');
    }
  }
}
