import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AppUser } from "../models/user.model";
import { switchMap, map } from "rxjs/operators";
import { UserService } from "./user.service";
import { of } from "rxjs";

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);
    const provider = new firebase.auth.GoogleAuthProvider();

    this.afAuth.auth.signInWithRedirect(provider).then(res => {});
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        }
        return of(null);
      })
    );
    // switchMap used to map observable to onther observable
    // when use async pipe with nested observable that cause an infinte loop
  }
}
