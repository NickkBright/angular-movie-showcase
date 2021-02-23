import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { RequestToken } from "../model/auth";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthResolver implements Resolve<any>{

    constructor(private authService: AuthService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token: RequestToken = ({success: route.queryParams.approved, token: route.queryParams.request_token});
        if(token.success === 'true') {
            this.authService.login(token);
            this.router.navigateByUrl('');
        }
    }
}