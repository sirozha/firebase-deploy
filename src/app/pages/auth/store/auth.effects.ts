import { Injectable } from '@angular/core';
import {
  Auth,
  User as FirebaseUser,
  user as firebaseUser,
} from '@angular/fire/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as AuthActions from './auth.actions';
import { Role, roles } from '../models/role.model';

@Injectable()
export class AuthEffects {
  getUser = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.getUser),
      switchMap(() =>
        firebaseUser(this.auth).pipe(
          switchMap(
            (user: FirebaseUser | null) =>
              user ? from(user.getIdTokenResult()) : of(null),
            (user, token) => ({ user, token })
          ),
          switchMap((data: { user: FirebaseUser | null; token: any }) => {
            console.log('getUser Effect => data', data);
            const { user, token } = data;
            // const roles: (keyof typeof Role)[] = [...new Set(Object.keys(r))].reduce(
            //   (value: (keyof typeof Role)[], role: keyof typeof Role) =>
            //     token?.claims[role] ? [...value, role] : value,
            //   []
            // );
            const role =
              ([...new Set(Object.keys(roles))].find(
                (role) => token?.claims?.[role]
              ) as Role) || null;
            console.log('getUser Effect => role', role);

            if (!user) {
              return [
                AuthActions.setUser({ user: null }),
                AuthActions.setProfile({ profile: null }),
              ];
            }

            return [
              AuthActions.setUser({
                user: {
                  id: user.uid,
                  email: user.email,
                  emailVerified: user.emailVerified,
                  phone: user.phoneNumber,
                  name: user.displayName,
                  photoURL: user.photoURL,
                  role,
                  providerId: user.providerData[0].providerId,
                },
              }),
            ];
          }),
          catchError(() =>
            from([
              AuthActions.setUser({ user: null }),
              AuthActions.setProfile({ profile: null }),
            ])
          )
        )
      )
    )
  );

  // getProfile = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(AuthActions.setUser),
  //     filter(({ user }) => !!user),
  //     switchMap(({ user }) =>
  //       this.firebaseService.getDocument(Page.users, user.id).pipe(
  //         map((profile: Profile) => AuthActions.setProfile({ profile })),
  //         catchError(() => of(AuthActions.setProfile({ profile: null })))
  //       )
  //     )
  //   )
  // );

  setLoaded = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.setProfile),
      map(() => AuthActions.setLoaded({ isLoaded: true }))
    )
  );

  constructor(
    private actions: Actions,
    private auth: Auth,
    private firebaseService: FirebaseService
  ) {}
}
