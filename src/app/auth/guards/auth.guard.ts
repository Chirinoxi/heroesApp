import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // ---------------------- Forma #1 ----------------------
    // if (this.authService.auth?.id) {
    //   return true;
    // }
    // console.log('Bloqueado por canActivate - AuthGuard');
    // return false;
    return this.authService.verifyAuthentication().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.verifyAuthentication().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }
}
