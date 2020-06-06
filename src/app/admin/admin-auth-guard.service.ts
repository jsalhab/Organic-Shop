import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class AdminAuthGuardService {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.appUser$.pipe(map(appUser => appUser.isAdmin));
  }
}
